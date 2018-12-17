# Text Review System - TRS
O TRS é a implementação do meu trabalho de conclusão de curso, que teve como objetivo criar um sistema colaborativo para revisão de texto. Nesse sistema o usuário pode inserir regras para revisão sem a necessidade de saber programação e compartilhar regras e revisões com outros usuários.

O projeto está hospedado em: [TRS Beta](http://tcc2trs.herokuapp.com/#/home) 

## Configuração do backend

### Intalar pip

**pip** é um sistema de gerenciamento de pacotes usado para instalar e gerenciar pacotes de software escritos na linguagem de programação Python.

Para instalar, basta executar o comando:

`$ sudo apt-get install python-pip`


### Instalar virtualenv

**virtualenv** é uma ferramenta para criação de ambientes virtuais.

Para instalar, basta executar o comando:

`$ sudo pip install virtualenv`


### Criando ambiente virtual

Para criar um novo ambiente virtual, basta executar o comando:

`$ virtualenv -p python3 myenv`

Onde `myenv` é o nome do ambiente virtual a ser criado, e o parâmetro `-p` específica a versão do Python a ser utilizada.

### Ativando o ambiente virtual

Além de instalar, é necessário ativar o ambiente virtual que foi criado. Para isto, dentro da pasta do ambiente virtual que foi criado, basta executar o comando:

`$ source bin/activate`


### Desativando o ambiente virtual

Para desativar o ambiente virtual, não importa o diretório que esteja, basta executar o comando:

`$ deactivate`


### Clonado o repositório

Dentro do ambiente virtual, basta executar:

`$ git clone https://github.com/arleyribeiro/TRS-Beta.git`


### Instalando dependências

Dentro da pasta raiz do repositório, para instalar todas as dependências do projeto, basta executar:

`$ pip install -r requirements.txt`

Serão instalados todos os pacotes listados em requirements.txt


### Atualizando dependências

Sempre que novos pacotes forem instalados, o arquivo requirements.txt deve ser atualizado. Para isto, dentro da pasta raiz do repositório, basta executar:

`pip freeze > requirements.txt`

### Executando o projeto

Em um terminal na pasta do projeto com o ambiente virtual configurado e ativado execute:

`python manage.py runserver`

## Configuração do frontend

### Instalando o angular cli

### Atualizando o sistema (linux)

`sudo apt update`

### Instalando o Node.js (8.11.3)

`sudo apt install nodejs`

### Instalando o npm para gerenciar os pacotes do Node.js

`sudo apt install npm`

### Verificando a versão do Node.js

`nodejs -v`

### Verificando a versão do npm (6.1.0)

`npm -v`

### Instalando o angular

`npm install -g @angular/cli`

### Executando o projeto

Em um terminal na pasta do projeto o comando abaixo para instalar as dependências do projeto.

`npm install`

E em seguida execute o servidor do angular.

`ng serve`

reference: 'https://github.com/sauloantuness/liby'

reference: 'https://receitasdecodigo.com.br/ubuntu/como-instalar-o-node-js-no-ubuntu-18-04'

reference: 'https://www.digitalocean.com/community/tutorials/como-instalar-o-node-js-no-ubuntu-16-04-pt'
