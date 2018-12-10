from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.core.serializers.json import DjangoJSONEncoder
from django.views.decorators.csrf import csrf_exempt
from webapi.rule.models import *
from webapi.historyChangesText.models import *
from webapi.user.models import *
from django.core.mail import send_mail

import re
import json

def removeOverlappingInconsistencies(matches):
	#remove regras sobrepostas
	for m in matches[:]:
		mStart = m['start']
		mEnd = m['end']
		for n in matches[:]:
			nStart = n['start']
			nEnd = n['end']
			if mStart == nStart:
				if nEnd < mEnd:
					matches.remove(n)
			if mEnd == nEnd:
				if nStart > mStart:
					matches.remove(n)
			if (nStart > mStart) and (nEnd < mEnd):
				matches.remove(n)
			if nStart > mStart and nStart < mEnd:
				if nEnd > mEnd:
					matches.remove(n)
			#if mStart == nStart and mEnd == nEnd and m['inconsistency_id'] != n['inconsistency_id']:
				#matches.remove(n)
	return matches

def has_no_duplicate(start, end, matches):
	for match in matches:
		if match['start'] == start and match['end'] == end:
			return False
	return True

def findInconsistencies(inconsistencies, text):
	inconsistencies = inconsistencies
	matches = []
	suggestions = []
	inconsistenciesUsed = []
	suggestions = []
	lista = []

	#para cada inconsistencia procura uma ocorrência no texto
	#cria um array de matches e sugestões de substituição
	for i in inconsistencies:
		regexType = i['regexType']
		pattern = i['pattern']

		if(regexType == 1):
			regex=r''+ pattern +r''
		elif(regexType == 2):
			regex=r'\b'+ pattern +r'\b'
		elif(regexType == 3):
			regex=r'\b'+re.escape( pattern )+r'\b'
		
		for m in re.finditer(regex, text, flags=re.IGNORECASE):
			if has_no_duplicate(m.start(), m.end(), matches):
				matches.append({ 'content': m.group(0), 'start': m.start(), 'end': m.end(), 'match': True, 'inconsistency_id': i['id'], 'description': i['description'] })
				tip = list(Suggestion.objects.filter(inconsistency_id=i['id']).values())
				inconsistenciesUsed.append(i)
				for t in tip:
					suggestions.append(t)

	suggestions = [dict(tupleized) for tupleized in set(tuple(match.items()) for match in suggestions)]
	inconsistenciesUsed = [dict(tupleized) for tupleized in set(tuple(match.items()) for match in inconsistenciesUsed)]

	#remove ocorrências duplicadas
	lista = [dict(tupleized) for tupleized in set(tuple(match.items()) for match in matches)]
	matchesOrdered = sorted(lista, key=lambda x: x['start'], reverse=False)

	matches = removeOverlappingInconsistencies(matchesOrdered)

	return ({ 'matches': matches, 'inconsistenciesUsed': inconsistenciesUsed , 'suggestions': suggestions, 'inconsistenciesNumber': len(matches)})

def filterInconsistencyByRequest(filterBy,dataFilter):
	queryInconsistencies = []
	if(filterBy is None):
		for q in Inconsistency.objects.select_related('user__inconsistencies').values(): #query.values():
				queryInconsistencies.append(q)
	elif(filterBy == 'USERS' and dataFilter is not None and len(dataFilter) != 0):
		for id in dataFilter:
			for q in Inconsistency.objects.filter(user__id=id).values():
				queryInconsistencies.append(q)
	elif(filterBy == 'INCONSISTENCY' and dataFilter is not None  and len(dataFilter) != 0):
		for id in dataFilter:
			for q in Inconsistency.objects.filter(id=id).values():
				queryInconsistencies.append(q)
	return queryInconsistencies

def getChangesInText(id):
	dataChangesInText = []
	for item in FoundInconsistencies.objects.filter(historyChangesText_id=id).values():
		for change in ChangeInText.objects.filter(foundInconsistencies_id=item['id']).values():
			dataChangesInText.append({'oldText': change['oldText'], 
			'newText': change['newText'], 
			'suggestion': change['suggestion_id'],
			'idxMatch': 0,
			'disabled': True})
	return 	dataChangesInText


def processor(request):
	queryInconsistencies = Inconsistency.objects.select_related('user__inconsistencies')#recupera todas as regras
	patterns = []

	if(request.method=='POST'):		
		body_unicode = request.body.decode('utf-8')
		body = json.loads(body_unicode)

		lista = []
		matches = []
		suggestions = []
		contentString = body["content"] #conteudo recebido
		editMode = body["editMode"]
		idText = body["idText"]
		dataChangesInText = []

		if(editMode and idText is not None):
			dataChangesInText = getChangesInText(idText)

		#contentString = "Este e esse são pronomes demonstrativos, situando isto alguém ou alguma coisa no tempo, isso no espaço e no discurso em relação às próprias-se pessoas do nesse discurso-se.\nNão começa com match Este e esse são pronomes demonstrativos, situando isto alguém-se ou alguma coisa no tempo, isso no espaço e no discurso em relação às próprias pessoas-se do nesse discurso."
		fullMatches = [] #contém as ocorrências encontradas e o texto que não houve ocorrência
		inconsistenciesUsed = []
		#remove padrões duplicados
		patterns = filterInconsistencyByRequest(body["filter"], body["dataFilter"])

		inconsistencies = [dict(tupleized) for tupleized in set(tuple(pattern.items()) for pattern in patterns)]
		
		#call here
		tmp = findInconsistencies(inconsistencies, contentString)

		matches = tmp['matches']
		inconsistenciesNumber = tmp['inconsistenciesNumber']
		inconsistenciesUsed = tmp['inconsistenciesUsed']
		suggestions = tmp['suggestions']

		#matches = removeOverlappingInconsistencies(matches)

		if(matches):
			#recupera o texto que não houve ocorrência
			ant = 0
			rest = []
			for match in matches:
				pos = match['start']
				if(ant < pos):
					rest.append({'content':contentString[ant:pos], 'start': ant, 'end': pos, 'match': False})
				ant = match['end']

			pos = len(contentString)
			if(ant < pos):
				rest.append({'content':contentString[ant:], 'start': ant, 'end': pos, 'match': False})

			#adiciona na lista o texto sem ocorrências
			for r in rest:
				matches.append(r)
		
			#remove possiveis duplicatas
			result = [dict(tupleized) for tupleized in set(tuple(match.items()) for match in matches)]
			matches = sorted(result, key=lambda x: x['start'], reverse=False)
			#fullMatches = sorted(fullMatches, key=lambda x: x['end'], reverse=False)
		else:
			matches.append({ 'editMode': editMode, 'idText': int(idText) if (idText is not None) else idText, 'content': contentString, 'start': 0, 'end': len(contentString), 'match': False, 'inconsistency_id': "", 'dataChangesInText': dataChangesInText, 'inconsistenciesNumber': inconsistenciesNumber })
		rebuild = ""

		teste = []
		for i in range(0,len(inconsistenciesUsed)):
			ic = inconsistenciesUsed[i]
			ap = []
			for j in range(0,len(suggestions)):
				sg = suggestions[j]
				if(ic['id'] == sg['inconsistency_id']):
					ap.append(sg)
			ic['suggestions'] = ap
			teste.append(ic)
	
		return ({ 'editMode': editMode, 'idText': int(idText) if (idText is not None) else idText, 'content': contentString, 'originalText': contentString, 'matches': matches, 'suggestions': suggestions, 'inconsistencies': teste, 'dataChangesInText': dataChangesInText, 'inconsistenciesNumber': inconsistenciesNumber })


def processorPdf(request):
	queryInconsistencies = Inconsistency.objects.select_related('user__inconsistencies')#recupera todas as regras
	patterns = []

	for q in queryInconsistencies.values():
		patterns.append(q)
		#patterns.append({'pattern': q.pattern, 'id':q.id, 'description': q.description})

	if(request.method=='POST'):		
		body_unicode = request.body.decode('utf-8')
		body = json.loads(body_unicode)

		lista = []
		matches = []
		suggestions = []
		contentString = body["content"] #conteudo recebido
		fullMatches = [] #contém as ocorrências encontradas e o texto que não houve ocorrência
		inconsistenciesUsed = []
		html = ""
		#remove padrões duplicados
		inconsistencies = [dict(tupleized) for tupleized in set(tuple(pattern.items()) for pattern in patterns)]
		
		#call here
		tmp = findInconsistencies(inconsistencies, contentString)

		matches = tmp['matches']
		inconsistenciesUsed = tmp['inconsistenciesUsed']
		suggestions = tmp['suggestions']

		if(matches):
			#remove duplicate rule activated
			lista = set(lista)
			rtext = contentString
			textt =''
			startMark = "<span style=\"background-color: #FFFF00\">"
			endMark = "</span>"
			for text in inconsistenciesUsed:
				rtext = re.sub(r'\b'+i['pattern']+r'\b' if text['isRegex'] else r'\b'+re.escape(text['pattern'])+r'\b', startMark+text+endMark, rtext)

		else:
			matches.append({ 'html': html })	
		return ({ 'html': html})

# Create your views here.
@csrf_exempt 
def simpleProcessor(request):
		content = processor(request);
		return JsonResponse(content, safe=False)

# Create your views here.
@csrf_exempt 
def simpleProcessorPDF(request):
		content = processorPdf(request);
		return JsonResponse(content, safe=False)

# Create your views here.
@csrf_exempt
def sendEmail(request):
	if(request.method=='POST'):		
		body_unicode = request.body.decode('utf-8')
		body = json.loads(body_unicode)
		id_users = body['recipient_list']
		ownerId = body['user']
		owner = User.objects.filter(id=ownerId)[0]
		name = owner.getName()
		from_email = 'noreply.trs@gmail.com'
		for id in id_users:
			user = User.objects.filter(id=id)[0]			
			email = user.getEmail()
			subject = name + " compartilhou um texto com você."
			message = 'Para visualizar o texto compartilhado acesse: https://tcc2trs.herokuapp.com'
			if subject and message and email:
				send_mail(subject, message, from_email, [email])
		return HttpResponse('ok')
