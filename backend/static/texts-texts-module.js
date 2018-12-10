(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["texts-texts-module"],{

/***/ "./src/app/texts/text-filter-by-inconsistency/text-filter-by-inconsistency.component.css":
/*!***********************************************************************************************!*\
  !*** ./src/app/texts/text-filter-by-inconsistency/text-filter-by-inconsistency.component.css ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#text-user-container {\n    display: flex;\n    flex-direction: column;\n}\n\n#boxSuggestion {\n    padding: 10px;\n    margin: 2px;\n    display: inline-flex;\n    word-break: break-all;\n    border: 1px solid lightgray;\n    border-radius: 5px;\n    margin-top: 40px !important;\n}\n\ntable {\n    width: 100%;\n    max-height: 400px;\n    overflow: auto;\n}\n\n#positionRight {\n    float: right;\n    margin-top: 10px;\n    margin-bottom: 10px;\n}"

/***/ }),

/***/ "./src/app/texts/text-filter-by-inconsistency/text-filter-by-inconsistency.component.html":
/*!************************************************************************************************!*\
  !*** ./src/app/texts/text-filter-by-inconsistency/text-filter-by-inconsistency.component.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"padding: 10px 10px 15px 10px;\" class=\"header-color-primary\">\n\n  <div fxLayout=\"col\">\n    <mat-card-title style=\"width: 100%; margin-top: 0px !important;\">Personalizar conjunto de regras</mat-card-title>\n    <mat-icon class=\"mouse-cursor-pointer\"  style=\"float: right; color:white !important\" matSuffix (click)=\"closeModal()\">{{ 'close' }}</mat-icon>     \n  </div>\n  <div fxLayout=\"col\" fxLayoutAlign=\"start center\" class=\"boxButtons\">\n    <mat-form-field fxFlex=\"100%\">\n      <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Buscar\">\n      <mat-icon class=\"mouse-cursor-pointer\"  matSuffix>{{ 'search' }}</mat-icon>\n    </mat-form-field>\n  </div>\n  <div class=\"mat-elevation-z8\">\n      <table mat-table [dataSource]=\"dataSource\">\n\n        <ng-container matColumnDef=\"select\">\n            <th mat-header-cell *matHeaderCellDef>\n              <mat-checkbox (change)=\"$event ? masterToggle() : null\"\n                            [checked]=\"selection.hasValue() && isAllSelected()\"\n                            [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\n              </mat-checkbox>\n            </th>\n            <td mat-cell *matCellDef=\"let row\">\n              <mat-checkbox (click)=\"$event.stopPropagation()\"\n                            (change)=\"$event ? selection.toggle(row) : null\"\n                            [checked]=\"selection.isSelected(row)\">\n              </mat-checkbox>\n            </td>\n          </ng-container>\n    \n        <!-- Position Column -->\n        <ng-container matColumnDef=\"name\">\n          <th mat-header-cell *matHeaderCellDef> Nome </th>\n          <td mat-cell *matCellDef=\"let element\"> {{element.name}} </td>\n        </ng-container>\n            \n        <!-- Position Column -->\n        <ng-container matColumnDef=\"pattern\">\n          <th mat-header-cell *matHeaderCellDef width=\"100px\"> Padrão </th>\n          <td mat-cell *matCellDef=\"let element\"> {{element.pattern}} </td>\n        </ng-container>\n\n        <!-- Position Column -->\n        <ng-container matColumnDef=\"user\">\n          <th mat-header-cell *matHeaderCellDef width=\"100px\"> Inserida por </th>\n          <td mat-cell *matCellDef=\"let element\"> {{ element.username }} </td>\n        </ng-container>\n\n        <!-- Position Column -->\n        <ng-container matColumnDef=\"description\">\n          <th mat-header-cell *matHeaderCellDef width=\"100px\"> Descrição </th>\n          <td mat-cell *matCellDef=\"let element\"> {{element.description}} </td>\n        </ng-container>\n\n        <tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: true\"></tr>\n        <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n      </table>\n    \n      <!--mat-paginator [pageSizeOptions]=\"[5, 10, 20]\" showFirstLastButtons></mat-paginator -->\n  </div>\n\n  <div>\n    <button mat-button color=\"primary\" [mat-dialog-close]=\"[]\" id=\"positionRight\">Cancelar</button>\n    <button mat-raised-button color=\"primary\" [mat-dialog-close]=\"filterByInconsistenciesId()\" id=\"positionRight\">Aplicar</button>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/texts/text-filter-by-inconsistency/text-filter-by-inconsistency.component.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/texts/text-filter-by-inconsistency/text-filter-by-inconsistency.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: TextFilterByInconsistencyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextFilterByInconsistencyComponent", function() { return TextFilterByInconsistencyComponent; });
/* harmony import */ var _texts_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../texts.service */ "./src/app/texts/texts.service.ts");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/esm5/collections.es5.js");
/* harmony import */ var _rules_rules_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../rules/rules.service */ "./src/app/rules/rules.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var TextFilterByInconsistencyComponent = /** @class */ (function () {
    function TextFilterByInconsistencyComponent(rulesService, textsService, matDialogRef, dataSource) {
        this.rulesService = rulesService;
        this.textsService = textsService;
        this.matDialogRef = matDialogRef;
        this.dataSource = dataSource;
        this.inconsistencies = [];
        this.userIds = [];
        this.displayedColumns = ['select', 'name', 'pattern', 'user', 'description'];
        this.selection = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_1__["SelectionModel"](true, []);
    }
    TextFilterByInconsistencyComponent.prototype.ngOnInit = function () {
        this.getAllInconsistencies();
    };
    TextFilterByInconsistencyComponent.prototype.getAllInconsistencies = function () {
        var _this = this;
        this.textsService.currentMessageUser.subscribe(function (response) {
            if (response.dataFilter != null) {
                _this.rulesService
                    .getAllInconsistencies()
                    .subscribe(function (result) {
                    //console.log("Response: ", response.dataFilter)
                    response.dataFilter.forEach(function (idUser) {
                        result.forEach(function (rule) {
                            if (rule.user == idUser) {
                                _this.inconsistencies.push(rule);
                            }
                        });
                    });
                    _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](_this.inconsistencies);
                    _this.dataSource.paginator = _this.paginator;
                    _this.selection = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_1__["SelectionModel"](true, _this.inconsistencies);
                });
            }
        });
    };
    TextFilterByInconsistencyComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    /** Whether the number of selected elements matches the total number of rows. */
    TextFilterByInconsistencyComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    TextFilterByInconsistencyComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    TextFilterByInconsistencyComponent.prototype.isOnlyOneSelected = function () {
        return (this.selection.selected.length == 1) ? false : true;
    };
    TextFilterByInconsistencyComponent.prototype.filterByInconsistenciesId = function () {
        var inconsistenteciesIds = [];
        for (var _i = 0, _a = this.selection.selected; _i < _a.length; _i++) {
            var item = _a[_i];
            inconsistenteciesIds.push(item.id);
        }
        return inconsistenteciesIds;
    };
    TextFilterByInconsistencyComponent.prototype.closeModal = function () {
        this.matDialogRef.close();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"])
    ], TextFilterByInconsistencyComponent.prototype, "paginator", void 0);
    TextFilterByInconsistencyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"])({
            selector: 'app-text-filter-by-inconsistency',
            template: __webpack_require__(/*! ./text-filter-by-inconsistency.component.html */ "./src/app/texts/text-filter-by-inconsistency/text-filter-by-inconsistency.component.html"),
            styles: [__webpack_require__(/*! ./text-filter-by-inconsistency.component.css */ "./src/app/texts/text-filter-by-inconsistency/text-filter-by-inconsistency.component.css")]
        }),
        __param(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_rules_rules_service__WEBPACK_IMPORTED_MODULE_2__["RulesService"],
            _texts_service__WEBPACK_IMPORTED_MODULE_0__["TextsService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], Object])
    ], TextFilterByInconsistencyComponent);
    return TextFilterByInconsistencyComponent;
}());



/***/ }),

/***/ "./src/app/texts/text-filter-by-users/text-filter-by-users.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/texts/text-filter-by-users/text-filter-by-users.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container-shared-table {\n    overflow: auto;\n    max-height: 400px;\n    margin-top: 10px;\n}\n\n#boxSuggestion {\n    padding: 10px;\n    margin: 2px;\n    display: inline-flex;\n    word-break: break-all;\n    border: 1px solid lightgray;\n    border-radius: 5px;\n}\n\ntable {\n    width: 100%;\n}\n\n#positionRight {\n    float: right;\n    margin-top: 20px;\n}"

/***/ }),

/***/ "./src/app/texts/text-filter-by-users/text-filter-by-users.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/texts/text-filter-by-users/text-filter-by-users.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n<div>\n  O usuário pode aplicar regras ao texto de três formas:\n  <ol>\n    <li>Padrão: As regras disponíveis no conjunto padrão do sistema são aplicadas no texto.</li>\n    <li>Usuários: Selecionar os usuários e aplicar as regras inseridas por eles.</li>\n    <li>Personalizar regras: Selecionar autores disponíveis e selecionar regras apropriadas.</li>\n  </ol>\n</div>\n<div fxLayout=\"col\" fxLayoutAlign=\"start center\" class=\"boxButtons\">\n  <mat-form-field fxFlex=\"100%\">\n    <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Buscar\">\n    <mat-icon class=\"mouse-cursor-pointer\" matSuffix>{{ 'search' }}</mat-icon>\n  </mat-form-field>\n</div>\n\n  <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8 container-shared-table\">\n    \n    <ng-container matColumnDef=\"select\">\n      <th mat-header-cell *matHeaderCellDef>\n        <mat-checkbox (change)=\"$event ? masterToggle() : null\"\n        [checked]=\"selection.hasValue() && isAllSelected()\"\n        [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\n      </mat-checkbox>\n      </th>\n      <td mat-cell *matCellDef=\"let row\">\n        <mat-checkbox (click)=\"$event.stopPropagation()\"\n          (change)=\"$event ? selection.toggle(row) : null\"\n          [checked]=\"selection.isSelected(row)\">\n        </mat-checkbox>\n      </td>\n    </ng-container>\n  \n  <!-- Position Column -->\n  <ng-container matColumnDef=\"first_name\">\n    <th mat-header-cell *matHeaderCellDef> Nome </th>\n    <td mat-cell *matCellDef=\"let element\"> {{element.first_name}} </td>\n  </ng-container>\n  \n  <!-- Position Column -->\n  <ng-container matColumnDef=\"type\">\n    <th mat-header-cell *matHeaderCellDef width=\"100px\"> Perfil </th>\n    <td mat-cell *matCellDef=\"let element\"> {{element.role == 1 ? 'Estudante' : 'Professor(a)'}} </td>\n  </ng-container>\n   \n  <tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: true\"></tr>\n  <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n</table>\n\n<mat-card-actions>\n  <div style=\"min-height: 35px;  margin-right: 15px;\">\n    <button mat-raised-button color=\"primary\" (click)=\"onSubmit()\" style=\"float: right;\">Aplicar</button>\n  </div>\n</mat-card-actions>\n</mat-card>"

/***/ }),

/***/ "./src/app/texts/text-filter-by-users/text-filter-by-users.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/texts/text-filter-by-users/text-filter-by-users.component.ts ***!
  \******************************************************************************/
/*! exports provided: TextFilterByUsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextFilterByUsersComponent", function() { return TextFilterByUsersComponent; });
/* harmony import */ var _test_test_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../test/test.component */ "./src/app/test/test.component.ts");
/* harmony import */ var _text_filter_by_inconsistency_text_filter_by_inconsistency_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../text-filter-by-inconsistency/text-filter-by-inconsistency.component */ "./src/app/texts/text-filter-by-inconsistency/text-filter-by-inconsistency.component.ts");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/esm5/collections.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _users_users_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../users/users.service */ "./src/app/users/users.service.ts");
/* harmony import */ var _texts_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../texts.service */ "./src/app/texts/texts.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _rules_rules_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../rules/rules.service */ "./src/app/rules/rules.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TextFilterByUsersComponent = /** @class */ (function () {
    function TextFilterByUsersComponent(http, textsService, usersService, rulesService, dialog) {
        this.http = http;
        this.textsService = textsService;
        this.usersService = usersService;
        this.rulesService = rulesService;
        this.dialog = dialog;
        this.users = [];
        this.displayedColumns = ['select', 'first_name', 'type'];
        this.selection = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_2__["SelectionModel"](true, []);
        this.dataSource = [];
        this.configuration = {
            filter: null,
            dataFilter: null
        };
    }
    TextFilterByUsersComponent.prototype.ngOnInit = function () {
        this.getAllUsers();
        this.configuration.filter = 'USERS';
        this.configuration.dataFilter = [1];
        this.textsService.updateDataUser(this.configuration);
    };
    TextFilterByUsersComponent.prototype.getAllUsers = function () {
        var _this = this;
        this.usersService.getUsers().subscribe(function (data) {
            _this.ELEMENT_DATA = data.slice();
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](_this.ELEMENT_DATA);
            _this.dataSource;
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.data.forEach(function (element) {
                if (element.id == 1) {
                    _this.selection = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_2__["SelectionModel"](true, [element]);
                }
            });
        }, function (error) { console.log("Erro ao buscar dados: ", error.error), alert(error.error); });
    };
    TextFilterByUsersComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    /** Whether the number of selected elements matches the total number of rows. */
    TextFilterByUsersComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    TextFilterByUsersComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    TextFilterByUsersComponent.prototype.isOnlyOneSelected = function () {
        return (this.selection.selected.length == 1) ? false : true;
    };
    TextFilterByUsersComponent.prototype.filterByUsersId = function () {
        var userIds = [];
        for (var _i = 0, _a = this.selection.selected; _i < _a.length; _i++) {
            var item = _a[_i];
            userIds.push(item.id);
        }
        return userIds;
    };
    TextFilterByUsersComponent.prototype.openFilterByInconsistencies = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_text_filter_by_inconsistency_text_filter_by_inconsistency_component__WEBPACK_IMPORTED_MODULE_1__["TextFilterByInconsistencyComponent"], { disableClose: true });
        dialogRef
            .afterClosed()
            .subscribe(function (result) {
            if (result != null && result.length != 0) {
                _this.configuration.filter = 'INCONSISTENCY';
                _this.configuration.dataFilter = result;
                _this.textsService.updateDataUser(_this.configuration);
            }
            _this.dialog.closeAll();
        });
    };
    TextFilterByUsersComponent.prototype.onSubmit = function () {
        var _this = this;
        this.configuration.filter = 'USERS';
        this.configuration.dataFilter = this.filterByUsersId();
        this.textsService.updateDataUser(this.configuration);
        var dialogConfig = this
            .dialog
            .open(_test_test_component__WEBPACK_IMPORTED_MODULE_0__["TestComponent"], { disableClose: true,
            data: {
                title: 'Personalizar conjunto de regras',
                content: 'Você deseja personalizar o conjunto de regras?',
                buttonConfirm: 'Sim',
                buttonCancel: 'Não'
            }
        });
        dialogConfig
            .afterClosed()
            .subscribe(function (response) {
            if (response) {
                _this.openFilterByInconsistencies();
            }
            else {
                _this.dialog.closeAll();
            }
            _this.textsService.updateDataUser(_this.configuration);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"])
    ], TextFilterByUsersComponent.prototype, "paginator", void 0);
    TextFilterByUsersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["Component"])({
            selector: 'app-text-filter-by-users',
            template: __webpack_require__(/*! ./text-filter-by-users.component.html */ "./src/app/texts/text-filter-by-users/text-filter-by-users.component.html"),
            styles: [__webpack_require__(/*! ./text-filter-by-users.component.css */ "./src/app/texts/text-filter-by-users/text-filter-by-users.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"],
            _texts_service__WEBPACK_IMPORTED_MODULE_5__["TextsService"],
            _users_users_service__WEBPACK_IMPORTED_MODULE_4__["UsersService"],
            _rules_rules_service__WEBPACK_IMPORTED_MODULE_8__["RulesService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"]])
    ], TextFilterByUsersComponent);
    return TextFilterByUsersComponent;
}());



/***/ }),

/***/ "./src/app/texts/text-form/text-form.component.css":
/*!*********************************************************!*\
  !*** ./src/app/texts/text-form/text-form.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "form {\n   /*display: flex;*/\n    flex-direction: row;\n}\n\n#checkText, #correctionText {\n    width: 100%;\n    min-height: 300px;\n    border: lightgray 1px solid;\n}\n\n#formButtons {\n    float: right;\n    margin-left: 1.2px;\n}\n\n#formButtons button {\n    margin-right: 5px; \n}\n\n"

/***/ }),

/***/ "./src/app/texts/text-form/text-form.component.html":
/*!**********************************************************!*\
  !*** ./src/app/texts/text-form/text-form.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"formText\">\n  <div fxLayout=\"row\">\n    <mat-card fxFlex=\"applyConfigurations ? 100% : 50%\" class=\"header-color\">\n        <div fxLayout=\"col\">\n            <mat-card-title style=\"width: 85%;\">Texto para revisão</mat-card-title>\n            <button style=\"float: right; margin-top: -16px; height: 36px; padding-right: 4%;\" mat-button color=\"primary\" (click)=\"openConfiguration()\">\n              Configuração da revisão\n              <mat-icon matSuffix> {{ 'settings' }}</mat-icon>\n            </button>\n          </div>\n      <textarea  id=\"checkText\" formControlName=\"content\"></textarea>\n      <mat-card-actions id=\"formButtons\">\n        <button mat-raised-button color=\"primary\" type=\"submit\" (click)=\"onSubmit()\" [disabled]=\"\">Enviar texto</button>\n      </mat-card-actions>\n    </mat-card>\n    <div fxFlex=\"50%\" [style.display]=\"!applyConfigurations?'block':'none'\">\n      <app-text-filter-by-users></app-text-filter-by-users>\n    </div>\n  </div>\n</form>\n"

/***/ }),

/***/ "./src/app/texts/text-form/text-form.component.ts":
/*!********************************************************!*\
  !*** ./src/app/texts/text-form/text-form.component.ts ***!
  \********************************************************/
/*! exports provided: TextFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextFormComponent", function() { return TextFormComponent; });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _texts_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../texts.service */ "./src/app/texts/texts.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Data = /** @class */ (function () {
    function Data() {
    }
    return Data;
}());
var TextFormComponent = /** @class */ (function () {
    function TextFormComponent(textsService, formBuilder, router, dialog) {
        this.textsService = textsService;
        this.formBuilder = formBuilder;
        this.router = router;
        this.dialog = dialog;
        this.applyConfigurations = true;
        this.actived = false;
        this.panelOpenConfiguration = false;
    }
    TextFormComponent.prototype.ngOnInit = function () {
        this.formText = this.formBuilder.group({
            editMode: false,
            idText: 0,
            content: [null],
            filter: [null],
            dataFilter: [null]
        });
        this.formText.get('content').setValue("Estas duas palavras urso - esse e este - existem neste na língua portuguesa e estão corretas. São palavras esse parecidas, mas utilizadas em situações-se isso diferentes. O que isso distingue estes dois conceitos é uma-se questão referencial: tempo e espaço.\n\nEste e esse são pronomes demonstrativos, situando alguém ou alguma coisa no tempo, no espaço e no discurso em relação às próprias pessoas nesse do discurso.");
    };
    TextFormComponent.prototype.showInput = function () {
        console.log(this.formText.value);
    };
    TextFormComponent.prototype.onSubmit = function () {
        var _this = this;
        var data = [];
        this.textsService.currentMessageUser.subscribe(function (message) {
            data = message;
        });
        this.formText.get('filter').setValue(data.filter);
        this.formText.get('dataFilter').setValue(data.dataFilter);
        if (this.formText.value != null) {
            this.textsService.postText(this.formText.value).subscribe(function (data) {
                console.log(data);
                _this.textsService.updateData(data); //shared the data
                _this.applyConfigurations = false;
                _this.router.navigate(['/texts/text-processed']); //change route
            });
        }
    };
    TextFormComponent.prototype.openConfiguration = function () {
        this.applyConfigurations = !this.applyConfigurations;
    };
    TextFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-text-form',
            template: __webpack_require__(/*! ./text-form.component.html */ "./src/app/texts/text-form/text-form.component.html"),
            styles: [__webpack_require__(/*! ./text-form.component.css */ "./src/app/texts/text-form/text-form.component.css")]
        }),
        __metadata("design:paramtypes", [_texts_service__WEBPACK_IMPORTED_MODULE_2__["TextsService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_0__["MatDialog"]])
    ], TextFormComponent);
    return TextFormComponent;
}());



/***/ }),

/***/ "./src/app/texts/text-historic-form/text-historic-form.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/texts/text-historic-form/text-historic-form.component.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-container {\n    display: flex;\n    flex-direction: column;\n    width: 450px;\n}\n\n#formButtons {\n    float: right;\n    margin-left: 1.2px;\n}\n\n#formButtons button {\n    margin-right: 5px; \n}"

/***/ }),

/***/ "./src/app/texts/text-historic-form/text-historic-form.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/texts/text-historic-form/text-historic-form.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header-color-primary\" style=\"padding: 23px;\">\n<mat-card-header>\n    <mat-card-title>Salvar revisão</mat-card-title>\n  </mat-card-header>\n<form [formGroup]=\"formHistoryChangesText\" class=\"example-container\">\n  <mat-form-field>\n      <input matInput placeholder=\"Nome\" formControlName=\"name\" [(value)]=\"formHistoryChangesText.get('name').value\">\n      <mat-error *ngIf=\"formHistoryChangesText.get('name').invalid\">Nome não pode ser nulo!</mat-error>\n  </mat-form-field>\n  <mat-form-field>\n    <textarea matInput placeholder=\"Descrição\" formControlName=\"description\" [(value)]=\"formHistoryChangesText.get('description').value\"></textarea>\n    <mat-error *ngIf=\"formHistoryChangesText.get('description').invalid\">A descrição não pode ser nula!</mat-error>\n  </mat-form-field>\n</form>\n<mat-card-actions id=\"formButtons\">\n  <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"disabledSubmit()\" [mat-dialog-close]=\"formHistoryChangesText.value\">Salvar</button>\n  <button mat-button color=\"primary\"  [mat-dialog-close]=\"false\">Cancelar</button>\n</mat-card-actions>\n</div>"

/***/ }),

/***/ "./src/app/texts/text-historic-form/text-historic-form.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/texts/text-historic-form/text-historic-form.component.ts ***!
  \**************************************************************************/
/*! exports provided: TextHistoricFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextHistoricFormComponent", function() { return TextHistoricFormComponent; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _texts_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../texts.service */ "./src/app/texts/texts.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var TextHistoricFormComponent = /** @class */ (function () {
    function TextHistoricFormComponent(matDialogRef, dataSource, formBuilder, textsService, activateRoute) {
        this.matDialogRef = matDialogRef;
        this.dataSource = dataSource;
        this.formBuilder = formBuilder;
        this.textsService = textsService;
        this.activateRoute = activateRoute;
        this.dataText = null;
    }
    TextHistoricFormComponent.prototype.ngOnInit = function () {
        this.formHistoryChangesText = this.formBuilder.group({
            name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            description: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
        this.getInfo();
    };
    TextHistoricFormComponent.prototype.getInfo = function () {
        var _this = this;
        if (this.dataSource.editMode && this.dataSource.idText != null && this.dataSource.idText > 0) {
            console.log("this.dataSource.editMode: ", this.dataSource);
            this.textsService.getTextsHistoric(this.dataSource.idText).subscribe(function (response) {
                _this.formHistoryChangesText.get('name').setValue(response.name);
                _this.formHistoryChangesText.get('description').setValue(response.description);
                console.log("InfoText: ", response);
            });
        }
    };
    TextHistoricFormComponent.prototype.removeSpace = function (x) {
        if (x != null && x != '' && typeof (x) != 'undefined')
            return x.replace(/^\s+|\s+$/gm, '');
        return null;
    };
    TextHistoricFormComponent.prototype.disabledSubmit = function () {
        var name = "";
        var description = "";
        var disabled = false;
        name = this.removeSpace(this.formHistoryChangesText.get('name').value);
        description = this.removeSpace(this.formHistoryChangesText.get('description').value);
        if (name == null || name == '' || typeof (name) == 'undefined') {
            disabled = true;
        }
        if (description == null || description == '' || typeof (description) == 'undefined') {
            disabled = true;
        }
        return disabled;
    };
    TextHistoricFormComponent.prototype.closeModal = function () {
        this.matDialogRef.close();
    };
    TextHistoricFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"])({
            selector: 'app-text-historic-form',
            template: __webpack_require__(/*! ./text-historic-form.component.html */ "./src/app/texts/text-historic-form/text-historic-form.component.html"),
            styles: [__webpack_require__(/*! ./text-historic-form.component.css */ "./src/app/texts/text-historic-form/text-historic-form.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], Object, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _texts_service__WEBPACK_IMPORTED_MODULE_1__["TextsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["ActivatedRoute"]])
    ], TextHistoricFormComponent);
    return TextHistoricFormComponent;
}());



/***/ }),

/***/ "./src/app/texts/text-historic/text-historic.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/texts/text-historic/text-historic.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container-shared-table {\n    overflow: auto;\n    max-height: 500px;\n    margin-top: 10px;\n}\n\ntable {\n    width: 100%;\n}\n\ntd.mat-cell, th.mat-header-cell {\n    padding: 5px !important;\n}"

/***/ }),

/***/ "./src/app/texts/text-historic/text-historic.component.html":
/*!******************************************************************!*\
  !*** ./src/app/texts/text-historic/text-historic.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"col\" fxLayoutAlign=\"start center\" class=\"boxButtons\">\n  <mat-form-field fxFlex=\"50%\">\n    <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Buscar\">\n    <mat-icon class=\"mouse-cursor-pointer\"  matSuffix>{{ 'search' }}</mat-icon>\n  </mat-form-field>\n  <div fxFlex=\"50%\" [style.display]=\"isMultiSelected() ? 'block' : 'none'\">\n    <div style=\"float: right\">\n      <button mat-raised-button color=\"primary\" (click)=\"postSharedTextSelected()\">\n          Compartilhar selecionados\n        <mat-icon matSuffix >  {{ 'share' }}</mat-icon>\n      </button> \n      <button mat-button color=\"primary\" (click)=\"deleteSelected()\">\n        Excluir selecionados \n        <mat-icon matSuffix > {{ 'delete' }}</mat-icon>\n      </button>\n    </div>\n  </div>\n</div>\n<div class=\"mat-elevation-z8 container-shared-table\">\n    <table mat-table [dataSource]=\"dataSource\">\n\n        <ng-container matColumnDef=\"select\">\n            <th mat-header-cell *matHeaderCellDef>\n              <mat-checkbox (change)=\"$event ? masterToggle() : null\"\n                            [checked]=\"selection.hasValue() && isAllSelected()\"\n                            [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\n              </mat-checkbox>\n            </th>\n            <td mat-cell *matCellDef=\"let row\" >\n              <mat-checkbox (click)=\"$event.stopPropagation()\"\n                            (change)=\"$event ? selection.toggle(row) : null\"\n                            [checked]=\"selection.isSelected(row)\">\n              </mat-checkbox>\n            </td>\n          </ng-container>\n  \n      <!-- Symbol Column -->\n      <ng-container matColumnDef=\"created\">\n        <th mat-header-cell *matHeaderCellDef> Data </th>\n        <td mat-cell *matCellDef=\"let element\" > {{ element.created | date:'dd-MM-yyyy' }} </td>\n      </ng-container>\n      \n      <!-- Position Column -->\n      <ng-container matColumnDef=\"name\">\n        <th mat-header-cell *matHeaderCellDef> Nome </th>\n        <td mat-cell *matCellDef=\"let element\" > {{ element.name }} </td>\n      </ng-container>\n  \n      <!-- Name Column -->\n      <ng-container matColumnDef=\"description\">\n        <th mat-header-cell *matHeaderCellDef> Descrição </th>\n        <td mat-cell *matCellDef=\"let element\" > <span  matTooltip=\"{{ element.description }}\">{{ (element.description.length>100) ? element.description.slice(0,50)+'...' : element.description }}</span> </td>\n      </ng-container>\n\n      <!-- Name Column -->\n      <ng-container matColumnDef=\"text\">\n        <th mat-header-cell *matHeaderCellDef> Texto </th>\n        <td mat-cell *matCellDef=\"let element\" > <span  matTooltip=\"{{ element.text }}\">{{ (element.text.length>100) ? element.text.slice(0,50)+'...' : element.text }}</span> </td>\n      </ng-container>\n    \n      <ng-container matColumnDef=\"option\">\n          <th mat-header-cell *matHeaderCellDef>\n           \n          </th>\n          <td mat-cell *matCellDef=\"let element\">\n            <div [style.display]=\"isOnlyOneSelected(element.id) ?'none':'inline-flex'\">\n              <mat-icon class=\"mouse-cursor-pointer\" matSuffix (click)=\"redirectTo(element)\">{{ 'visibility' }}</mat-icon> \n              <mat-icon class=\"mouse-cursor-pointer\" matSuffix (click)=\"postSharedTextSelected()\">{{ 'share' }}</mat-icon>     \n              <mat-icon class=\"mouse-cursor-pointer\" matSuffix (click)=\"openEdit()\">{{ 'edit' }}</mat-icon>     \n              <mat-icon class=\"mouse-cursor-pointer\" matSuffix (click)=\"deleteSelected()\">{{ 'delete' }}</mat-icon>\n            </div>\n          </td>\n        </ng-container>\n  \n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: true\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n    </table>\n  \n    <!--mat-paginator [pageSizeOptions]=\"[5, 10, 20]\" showFirstLastButtons></mat-paginator!-->\n  </div>"

/***/ }),

/***/ "./src/app/texts/text-historic/text-historic.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/texts/text-historic/text-historic.component.ts ***!
  \****************************************************************/
/*! exports provided: TextHistoricComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextHistoricComponent", function() { return TextHistoricComponent; });
/* harmony import */ var _text_shared_dialog_text_shared_dialog_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../text-shared-dialog/text-shared-dialog.component */ "./src/app/texts/text-shared-dialog/text-shared-dialog.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _test_test_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../test/test.component */ "./src/app/test/test.component.ts");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/esm5/collections.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _texts_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../texts.service */ "./src/app/texts/texts.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var TextHistoricComponent = /** @class */ (function () {
    function TextHistoricComponent(textsService, router, dialog) {
        this.textsService = textsService;
        this.router = router;
        this.dialog = dialog;
        this.displayedColumns = ['select', 'created', 'name', 'description', 'text', 'option'];
        this.selection = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_3__["SelectionModel"](true, []);
    }
    TextHistoricComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    TextHistoricComponent.prototype.ngOnInit = function () {
        console.log("Get All texts");
        this.getAllTextsHistoric();
    };
    TextHistoricComponent.prototype.getAllTextsHistoric = function () {
        var _this = this;
        this.textsService.getAllTextsHistoric().subscribe(function (data) {
            _this.ELEMENT_DATA = data.slice();
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTableDataSource"](_this.ELEMENT_DATA);
            _this.dataSource.paginator = _this.paginator;
        }, function (error) { console.log("Erro ao buscar dados: ", error.error), alert(error.error); });
    };
    /** Whether the number of selected elements matches the total number of rows. */
    TextHistoricComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    TextHistoricComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    TextHistoricComponent.prototype.isMultiSelected = function () {
        return (this.selection.selected.length > 1) ? true : false;
    };
    TextHistoricComponent.prototype.isOnlyOneSelected = function (id) {
        return ((this.selection.selected.length == 1) && this.selection.selected[0].id == id) ? false : true;
    };
    TextHistoricComponent.prototype.openEdit = function () {
        console.log(this.selection.selected[0]);
        var textHistoric = this.selection.selected[0];
        var data = {
            editMode: true,
            idText: textHistoric.id,
            content: textHistoric.text,
            filter: [],
            dataFilter: [],
            lastEditions: textHistoric.changesInText
        };
        this.textsService.updateData(data);
        this.router.navigate(['/texts/text-processed', textHistoric.id]);
    };
    TextHistoricComponent.prototype.getUserIdToEmails = function () {
        var userIds = [];
        var dialogRef = this.dialog.open(_text_shared_dialog_text_shared_dialog_component__WEBPACK_IMPORTED_MODULE_0__["TextSharedDialogComponent"], { width: '80%', disableClose: true });
        dialogRef
            .afterClosed()
            .subscribe(function (result) {
            userIds = result;
            console.log("userIds:", userIds, result);
        });
        return userIds;
    };
    TextHistoricComponent.prototype.postSharedTextSelected = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_text_shared_dialog_text_shared_dialog_component__WEBPACK_IMPORTED_MODULE_0__["TextSharedDialogComponent"], { width: '80%', disableClose: true });
        dialogRef
            .afterClosed()
            .subscribe(function (result) {
            if (result.length) {
                if (_this.selection.selected.length) {
                    _this.selection.selected.forEach(function (element) {
                        var idUser = element.user;
                        var textId = element.id;
                        var sharedUser = result;
                        var data = {
                            onwerUser: idUser,
                            sharedUser: '',
                            historyChangesText: textId
                        };
                        for (var _i = 0, sharedUser_1 = sharedUser; _i < sharedUser_1.length; _i++) {
                            var user = sharedUser_1[_i];
                            data.sharedUser = user;
                            _this.textsService.postSharedText(data).subscribe(function (response) {
                                console.log("Enviar email selected: ", response);
                                //enviar email aqui
                            });
                        }
                    });
                }
            }
        });
    };
    TextHistoricComponent.prototype.sendEmail = function () {
        var data = {
            subject: 'Um texto foi compartilhado',
            message: 'Um texto foi compartilhado',
            recipient_list: ['arley.sribeiro@gmail.com',]
        };
        this.textsService.postSendEmail(data).subscribe(function (response) {
            console.log(response);
        });
    };
    TextHistoricComponent.prototype.redirectTo = function (item) {
        console.log(item);
        this.router.navigate(['texts/text-view-corrections/', item.id]);
    };
    TextHistoricComponent.prototype.deleteSelected = function () {
        var _this = this;
        var length = this.selection.selected.length;
        var title = length > 1 ? 'Deseja excluir os textos selecinados do histórico de revisões' : 'Deseja excluir o texto selecionado do histórico de revisões';
        var content = 'Após essa operação ' + length + (length > 1 ? ' registros serão excluídos.' : 'registro será excluído.');
        var dialogRef = this.dialog.open(_test_test_component__WEBPACK_IMPORTED_MODULE_2__["TestComponent"], { data: { title: title, content: content, buttonConfirm: 'Sim', buttonCancel: 'Não' } });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log("Dialog result: " + result);
            if (result) {
                if (length) {
                    _this.selection.selected.forEach(function (item, index) {
                        _this.textsService.deleteHistoricText(item.id).subscribe(function (response) {
                            console.log("Foi deletado: ", item.id);
                            if (index == length - 1) {
                                _this.getAllTextsHistoric();
                                _this.selection.clear();
                            }
                        });
                    });
                }
            }
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_7__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatPaginator"])
    ], TextHistoricComponent.prototype, "paginator", void 0);
    TextHistoricComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_6__["Component"])({
            selector: 'app-text-historic',
            template: __webpack_require__(/*! ./text-historic.component.html */ "./src/app/texts/text-historic/text-historic.component.html"),
            styles: [__webpack_require__(/*! ./text-historic.component.css */ "./src/app/texts/text-historic/text-historic.component.css")]
        }),
        __metadata("design:paramtypes", [_texts_service__WEBPACK_IMPORTED_MODULE_5__["TextsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialog"]])
    ], TextHistoricComponent);
    return TextHistoricComponent;
}());



/***/ }),

/***/ "./src/app/texts/text-processed-front/text-processed-front.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/texts/text-processed-front/text-processed-front.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/texts/text-processed-front/text-processed-front.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/texts/text-processed-front/text-processed-front.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"\">\n    <div fxLayout=\"row\">\n      <mat-card fxFlex=\"checkText ? 100% : 50%\">\n        <div id=\"correctionText\">\n          <span>\n            {{data}}\n          </span>\n        </div>\n      </mat-card>\n      <mat-card fxFlex=\"50%\">\n        <div id=\"correctionHistoric\"></div>\n          <mat-card-actions id=\"formButtons\">\n              <button mat-raised-button color=\"primary\" >Salvar</button>\n              <button mat-stroked-button color=\"primary\">Voltar</button>\n          </mat-card-actions>\n        </mat-card>\n    </div>\n</form>\n\n  \n  "

/***/ }),

/***/ "./src/app/texts/text-processed-front/text-processed-front.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/texts/text-processed-front/text-processed-front.component.ts ***!
  \******************************************************************************/
/*! exports provided: TextProcessedFrontComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextProcessedFrontComponent", function() { return TextProcessedFrontComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _texts_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../texts.service */ "./src/app/texts/texts.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*class tipo {
  originalText: any
  content: any
  matches: any
  inconsistencies: any
}*/
var TextProcessedFrontComponent = /** @class */ (function () {
    function TextProcessedFrontComponent(textsService, formBuilder) {
        this.textsService = textsService;
        this.formBuilder = formBuilder;
        this.dataDetails = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]("");
        this.currentDetails = this.dataDetails.asObservable();
        this.closeTooltip = false;
    }
    TextProcessedFrontComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.formText = this.formBuilder.group({
            content: [null]
        });
        this.textsService.currentMessage.subscribe(function (message) {
            _this.data = message;
            console.log("Data: ", _this.data);
        });
        this.currentDetails.subscribe(function (message) {
            _this.inconsistencyDetails = message;
            console.log("Inconsistency details: ", _this.inconsistencyDetails);
        });
        this.process();
    };
    TextProcessedFrontComponent.prototype.showData = function () {
        var _this = this;
        this.textsService.currentMessage.subscribe(function (message) { return _this.data = message; });
        console.log(this.data);
    };
    TextProcessedFrontComponent.prototype.newData = function (data) {
        this.textsService.updateData(data);
    };
    TextProcessedFrontComponent.prototype.updateDetails = function (data) {
        this.dataDetails.next(data);
    };
    TextProcessedFrontComponent.prototype.showInput = function () {
        console.log(this.formText.value);
    };
    TextProcessedFrontComponent.prototype.onSubmit = function () {
        if (this.formText.value != null) {
            console.log(this.formText.value);
            this.textsService.postText(this.formText.value).subscribe(function (data) {
                console.log(data);
            });
        }
    };
    TextProcessedFrontComponent.prototype.openTips = function (id, item) {
        console.log(item);
        this.closeTooltip = true;
        document.getElementById(id).style.visibility = 'visible';
        for (var _i = 0, _a = this.data.inconsistencies; _i < _a.length; _i++) {
            var inconsistency = _a[_i];
            if (item.inconsistency_id == inconsistency.id) {
                this.updateDetails(inconsistency);
                console.log("inconsistency: ", inconsistency);
            }
        }
    };
    TextProcessedFrontComponent.prototype.closeTips = function (id) {
        this.closeTooltip = false;
        document.getElementById(id).style.visibility = 'hidden';
    };
    TextProcessedFrontComponent.prototype.changeTip = function (id, suggestion, item, index) {
        console.log("teste: ", id, suggestion, item, index);
        this.closeTooltip = false;
        this.data.matches[index].match = false;
        this.data.matches[index].content = suggestion;
        document.getElementById(id).style.backgroundColor = 'rgb(255,255,255)';
        document.getElementById(id).className = 'none';
        this.updateDetails("");
    };
    TextProcessedFrontComponent.prototype.process = function () {
        //let text = this.data.originalText;
        //let re = this.data.inconsistencies[0].pattern;
        //let result = re.exec(text);
    };
    TextProcessedFrontComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-text-processed-front',
            template: __webpack_require__(/*! ./text-processed-front.component.html */ "./src/app/texts/text-processed-front/text-processed-front.component.html"),
            styles: [__webpack_require__(/*! ./text-processed-front.component.css */ "./src/app/texts/text-processed-front/text-processed-front.component.css")]
        }),
        __metadata("design:paramtypes", [_texts_service__WEBPACK_IMPORTED_MODULE_1__["TextsService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]])
    ], TextProcessedFrontComponent);
    return TextProcessedFrontComponent;
}());



/***/ }),

/***/ "./src/app/texts/text-processed/text-processed.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/texts/text-processed/text-processed.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "form {\n    /*display: flex;*/\n     flex-direction: row;\n     display: -ms-grid;\n     display: grid;\n }\n \n #correctionHistoric, #correctionText {\n     width: 100%;\n     border: lightgray 1px solid;\n }\n \n #formButtons {\n     float: right;\n     margin-left: 1.2px;\n }\n \n #formButtons button {\n     margin-right: 5px; \n }\n \n .tooltip {\n    position: relative;\n    display: inline-block;\n    border-bottom: 1px dotted black;\n}\n \n .tooltip .tooltiptext {\n    visibility: hidden;\n    /*width: 150px;*/\n    background-color: #a0c3f8;\n    color: rgb(4, 62, 121);\n    text-align: center;\n    border-radius: 6px;\n    border: solid 1px #a0c3f8;\n    \n    /* Position the tooltip */\n    position: absolute;\n    z-index: 1;\n    top: 100%;\n    left: 50%;\n    margin-left: -16px;\n}\n \n .tooltip .tooltiptext::after {\n    content: \"\";\n    position: absolute;\n    bottom: 100%;\n    left: 10%;\n    margin-left: -5px;\n    border-width: 5px;\n    border-style: solid;\n    border-color: transparent transparent #a0c3f8 transparent;\n}\n \n .tooltiptext button{\n    width: 100%\n}\n \n .ignoreSuggestion {\n    background: linear-gradient(to top,  #FFFFFF 36px, #a0c3f8 36px) !important;\n}\n \n .mat-card-title-no-margin-bottom {\n    margin-bottom: 0px;\n    -ms-grid-row-align: center;\n        align-self: center;\n}\n \n [contenteditable]:focus {\n    outline: 0px solid transparent;\n}\n \n .mat-card, .mat-expansion-panel {\n    margin: 5px;\n}"

/***/ }),

/***/ "./src/app/texts/text-processed/text-processed.component.html":
/*!********************************************************************!*\
  !*** ./src/app/texts/text-processed/text-processed.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"formText\">\n  <div fxLayout=\"row\">\n    <mat-card fxFlex=\"checkText ? 100% : 50%\" class=\"header-color\">\n      <!--button (click)=\"editTextP()\">Editar texto</button-->\n      <div fxLayout=\"col\">\n        <mat-card-title style=\"width: 75%;\">Texto verificado</mat-card-title>\n        <button style=\"float: right; margin-top: -16px; height: 36px;\" \n                mat-button color=\"primary\" \n                (click)=\"resubmitText()\"\n                [style.display]=\"data.matches == null ? 'none' : 'block'\">Verificar novamente\n          <mat-icon matSuffix class=\"mouse-cursor-pointer\">{{ 'replay' }}</mat-icon>\n        </button>\n      </div>\n      <div id=\"correctionText\" contenteditable=\"false\">\n        <span *ngFor=\"let item of data.matches; let idx = index\"\n              id=\"{{ item.start}}{{ item.end }}\"\n              [ngClass]=\"(item.match) ? 'tooltip' : 'none'\"\n              [style.background-color]=\"item.match ? '#FFFF00' : 'none'\"\n              (click)=\"item.match ? openTips('div-'+item.start+''+item.end, item) : 'none'\"\n              (mouseleave)=\"(item.match && closeTooltip) ? closeTips('div-'+item.start+''+item.end) : 'none'\">\n              \n              {{item.content}}\n          \n              <div class=\"tooltiptext ignoreSuggestion\"\n                  id=\"div-{{ item.start}}{{ item.end }}\"\n                  *ngIf=\"item.match && item.content!='\\n'\">\n            \n                <div *ngFor=\"let inconsistency of data.inconsistencies\">\n                  <div *ngFor=\"let suggestion of inconsistency.suggestions\">\n                    <button mat-button (click)=\"changeTip(item.start+''+item.end, suggestion, item, idx)\"\n                            *ngIf=\"item?.inconsistency_id == suggestion.inconsistency_id\">\n                      {{ suggestion.tip }}\n                    </button>\n                  </div>\n                </div>                \n                <button mat-button (click)=\"ignoreSuggestion(item, idx)\">\n                  Ignorar Sugestão\n                </button>\n              </div>\n        </span>\n      </div>\n\n      <mat-card-actions id=\"formButtons\">\n        <button mat-raised-button color=\"primary\" (click)=\"onSubmit()\" [disabled]=\"data.matches == null\">Salvar revisão</button>\n        <button mat-button color=\"primary\"\n                [disabled]=\"sharedDisabled\"\n                [style.display]=\"sharedDisabled ? 'none' : 'initial'\"\n                (click)=\"postSharedTextSelected()\">\n          Compartilhar revisão\n          <mat-icon matSuffix class=\"mouse-cursor-pointer\"> {{ 'share' }}</mat-icon>\n        </button>\n      </mat-card-actions>\n\n    </mat-card>\n      <div fxFlex=\"50%\">\n        <mat-card style=\"margin-bottom: 5px;\"                  \n                  [ngClass]=\"hiddenElementNoSuggestion ? 'custom-card-suggestion' : 'none'\"\n                  [style.border]=\"hiddenElementNoSuggestion ? '1px dotted #3f51b5' : 'none'\"\n                  class=\"header-color\">\n          <mat-card-title >{{ hiddenElementNoSuggestion ?   'Sugestão' : 'Sem marcação selecionada'}}</mat-card-title>\n          <div [style.display]=\"hiddenElementNoSuggestion ? 'none' : 'inherit'\">\n            {{ existInconsistency() ? 'Clique em uma marcação (inconsistência) ou use a navegação para exibir as sugestões de substituição.' : 'Não há marcação para exibir sugestão de substituição.' }}\n          </div>\n          <div [style.display]=\"hiddenElementNoSuggestion ? 'inherit' : 'none'\">\n            <div><span>Regra: </span> {{ inconsistencyDetails.name }}</div>\n            <div><span>Descrição: </span> {{ inconsistencyDetails.description }}</div>\n            <br>\n            <span>{{ inconsistencyDetails.suggestions?.length>1 ? 'Sugestões de substituição: ' : 'Sugestão de substituição: '}}</span>\n            <span *ngFor=\"let suggestion of inconsistencyDetails.suggestions; let idx = index\" (click)=\"changeTipByCard(suggestion)\">\n              <span mat-button *ngIf=\"inconsistencyDetails.id == suggestion.inconsistency_id\">\n                <span *ngIf=\"idx>=1\">, </span><span style=\"border-bottom: 1px dotted black;\">{{ suggestion.tip }}</span>\n              </span>\n            </span>\n          </div>\n          <mat-card-actions  [style.display]=\"!existInconsistency()  ? 'none' : 'inherit'\">\n            <button mat-button color=\"primary\" (click)=\"previousSuggestion()\">\n              <mat-icon class=\"mouse-cursor-pointer\"  matSuffix>{{ 'navigate_before' }}</mat-icon>\n              Anterior\n            </button>\n            <button mat-button color=\"primary\" (click)=\"nextSuggestion()\">\n              Próxima\n              <mat-icon class=\"mouse-cursor-pointer\"  class=\"mouse-cursor-pointer\"  matSuffix>{{ 'navigate_next' }}</mat-icon>\n            </button>\n          </mat-card-actions>       \n        </mat-card>\n        <!--Card of applied edtions-->\n        <mat-accordion *ngIf=\"dataChangesInText.length!=0\">\n            <mat-expansion-panel (opened)=\"expandChangesPainel = true\"\n                                  (closed)=\"expandChangesPainel = false\"\n                                  class=\"header-color\">\n              <mat-expansion-panel-header>\n                <mat-panel-title class=\"custom-painel-title\">           \n                  {{ dataChangesInText.length > 1 ? 'Edições aplicadas no texto' : 'Edição aplicada no texto'}}\n                </mat-panel-title>\n              </mat-expansion-panel-header>\n\n              <mat-card-content>\n              <mat-card *ngFor=\"let item of dataChangesInText; let idx = index\">\n                  <div>DE: {{item.oldText}}</div>\n                  <div>PARA: {{item.newText}}</div>\n                  <button mat-button color=\"primary\"\n                    *ngIf=\"!item.disabled\" \n                    (click)=\"undoChange(item, idx)\">Desfazer alteração \n                  <mat-icon class=\"mouse-cursor-pointer\"  matSuffix>{{ 'undo' }}</mat-icon>\n                </button>\n              </mat-card>                \n            </mat-card-content>\n            </mat-expansion-panel>\n          </mat-accordion>\n      </div>\n  </div>\n</form>"

/***/ }),

/***/ "./src/app/texts/text-processed/text-processed.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/texts/text-processed/text-processed.component.ts ***!
  \******************************************************************/
/*! exports provided: TextProcessedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextProcessedComponent", function() { return TextProcessedComponent; });
/* harmony import */ var _test_test_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../test/test.component */ "./src/app/test/test.component.ts");
/* harmony import */ var _text_filter_by_users_text_filter_by_users_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../text-filter-by-users/text-filter-by-users.component */ "./src/app/texts/text-filter-by-users/text-filter-by-users.component.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _texts_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../texts.service */ "./src/app/texts/texts.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _text_historic_form_text_historic_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../text-historic-form/text-historic-form.component */ "./src/app/texts/text-historic-form/text-historic-form.component.ts");
/* harmony import */ var _login_auth_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../login/auth.service */ "./src/app/login/auth.service.ts");
/* harmony import */ var _text_shared_dialog_text_shared_dialog_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../text-shared-dialog/text-shared-dialog.component */ "./src/app/texts/text-shared-dialog/text-shared-dialog.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var TextProcessedComponent = /** @class */ (function () {
    function TextProcessedComponent(textsService, authService, formBuilder, router, activatedRoute, dialog) {
        this.textsService = textsService;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.dialog = dialog;
        this.dataHistoric = [];
        this.dataChangesInText = [];
        this.openTipMatch = null;
        this.expandChangesPainel = true;
        this.nextIndex = -1;
        this.closeTooltip = false;
        this.lastWordId = null;
        this.hiddenElementNoSuggestion = false;
        this.editText = false;
        this.filter = null;
        this.dataFilter = null;
        this.idText = null;
        this.userId = null;
        this.dataDetails = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]("");
        this.currentDetails = this.dataDetails.asObservable();
        this.sharedDisabled = true;
    }
    TextProcessedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userId = this.authService.getUserId();
        this.formText = this.formBuilder.group({
            editMode: false,
            idText: [null],
            content: [null],
            filter: [null],
            dataFilter: [null]
        });
        this.formSave = this.formBuilder.group({
            id: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            user: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            description: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            text: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            foundInconsistencies: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
        });
        this.textsService.currentMessage.subscribe(function (message) {
            _this.data = message;
            //console.log("Data: ", this.data)
        });
        this.currentDetails.subscribe(function (message) {
            _this.inconsistencyDetails = message;
            //console.log("Inconsistency details: ", this.inconsistencyDetails)
        });
        this.expandChangesPainel = true;
        this.idText = this.activatedRoute.snapshot.paramMap.get('id');
        if (this.data.editMode && this.idText != null) {
            this.sharedDisabled = false;
            this.setFormText(this.data.content, this.idText, true);
            this.data.idText = this.idText;
            this.checkText(this.formText.value);
        }
    };
    TextProcessedComponent.prototype.checkText = function (dataSource) {
        var _this = this;
        this.textsService.postText(dataSource).subscribe(function (data) {
            _this.textsService.updateData(data); //shared the data
            _this.dataChangesInText = data.dataChangesInText;
        });
    };
    TextProcessedComponent.prototype.showData = function () {
        var _this = this;
        this.textsService.currentMessage.subscribe(function (message) { return _this.data = message; });
        console.log(this.data);
    };
    TextProcessedComponent.prototype.newData = function (data) {
        this.textsService.updateData(data);
    };
    TextProcessedComponent.prototype.updateDetails = function (data) {
        this.dataDetails.next(data);
    };
    TextProcessedComponent.prototype.showInput = function () {
        console.log(this.formText.value);
    };
    TextProcessedComponent.prototype.resetColorInconsistency = function (item) {
        this.lastWordId = (this.lastWordId == null) ? item.start + '' + item.end : this.lastWordId;
        document.getElementById(this.lastWordId).style.backgroundColor = '#FFFF00';
        document.getElementById(this.lastWordId).style.color = 'rgba(0,0,0,.87)';
        this.lastWordId = item.start + '' + item.end;
        document.getElementById(this.lastWordId).style.backgroundColor = '#eff3f9';
        document.getElementById(this.lastWordId).style.color = '#3f51b5';
    };
    TextProcessedComponent.prototype.openTips = function (id, item) {
        this.openTipMatch = item;
        console.log(item);
        this.closeTooltip = true;
        document.getElementById(id).style.visibility = 'visible';
        this.resetColorInconsistency(item);
        this.getInconsistencyDetails(item);
    };
    TextProcessedComponent.prototype.getInconsistencyDetails = function (item) {
        for (var _i = 0, _a = this.data.inconsistencies; _i < _a.length; _i++) {
            var inconsistency = _a[_i];
            if (item.inconsistency_id == inconsistency.id) {
                this.updateDetails(inconsistency);
                this.hiddenElementNoSuggestion = true;
            }
        }
    };
    TextProcessedComponent.prototype.closeTips = function (id) {
        this.closeTooltip = false;
        document.getElementById(id).style.visibility = 'hidden';
    };
    TextProcessedComponent.prototype.changeTipByCard = function (suggestion) {
        var item = this.openTipMatch;
        var id = item.start + '' + item.end;
        var index = null;
        for (var i = 0; i < this.data.matches.length; i++) {
            var match = this.data.matches[i];
            if (match.inconsistency_id == item.inconsistency_id &&
                match.start == item.start &&
                match.end == item.end && match.match) {
                index = i;
                break;
            }
        }
        this.resetColorInconsistency(item);
        this.changeTip(id, suggestion, item, index);
    };
    TextProcessedComponent.prototype.ignoreSuggestion = function (item, index) {
        var id = item.start + '' + item.end;
        this.data.matches[index].match = false;
        this.lastWordId = null;
        document.getElementById(id).style.backgroundColor = 'rgb(255,255,255)';
        document.getElementById(id).style.color = 'rgba(0,0,0,.87)';
        document.getElementById(id).className = 'none';
        this.updateDetails("");
        this.hiddenElementNoSuggestion = false;
    };
    TextProcessedComponent.prototype.changeTip = function (id, suggestion, item, index) {
        console.log("changeTip: ", id, suggestion, item, index);
        this.nextIndex = index;
        this.lastWordId = null;
        this.dataChangesInText.unshift({ oldText: this.data.matches[index].content,
            newText: suggestion.tip,
            suggestion: suggestion.id,
            idxMatch: index,
            disabled: false
        });
        this.closeTooltip = false;
        this.data.matches[index].match = false;
        this.data.matches[index].content = suggestion.tip;
        document.getElementById(id).style.backgroundColor = 'rgb(255,255,255)';
        document.getElementById(id).style.color = 'rgba(0,0,0,.87)';
        document.getElementById(id).className = 'none';
        this.updateDetails("");
        this.hiddenElementNoSuggestion = false;
    };
    TextProcessedComponent.prototype.nextSuggestion = function () {
        var lenghtMatches = this.data.matches.length - 1;
        this.nextIndex += 1;
        if ((this.nextIndex + 1) >= lenghtMatches)
            this.nextIndex = 0;
        for (var i = this.nextIndex; i < this.data.matches.length; i++) {
            var item = this.data.matches[i];
            if ((i + 1) >= lenghtMatches && this.existInconsistency()) {
                i = 0;
                this.nextIndex = 0;
            }
            if (item.match) {
                this.openTipMatch = item;
                this.resetColorInconsistency(item);
                this.getInconsistencyDetails(item);
                this.nextIndex = i;
                break;
            }
            this.nextIndex++;
        }
    };
    TextProcessedComponent.prototype.previousSuggestion = function () {
        var lenghtMatches = this.data.matches.length - 1;
        this.nextIndex -= 1;
        if ((this.nextIndex) <= 0)
            this.nextIndex = lenghtMatches;
        for (var i = this.nextIndex; i >= 0; i--) {
            var item = this.data.matches[i];
            if ((i - 1) < 0 && this.existInconsistency()) {
                i = lenghtMatches;
                this.nextIndex = lenghtMatches;
            }
            if (item.match) {
                this.openTipMatch = item;
                this.resetColorInconsistency(item);
                this.getInconsistencyDetails(item);
                this.nextIndex = i;
                break;
            }
            this.nextIndex--;
        }
    };
    TextProcessedComponent.prototype.existInconsistency = function () {
        var lengthMatches = 0;
        if (this.data.matches != null)
            lengthMatches = this.data.matches.length;
        for (var i = 0; i < lengthMatches; i++)
            if (this.data.matches[i].match)
                return true;
        return false;
    };
    TextProcessedComponent.prototype.undoChange = function (tip, index) {
        console.log("teste: ", tip);
        console.log("Historic: ", this.dataChangesInText, index);
        this.closeTooltip = false;
        this.data.matches[tip.idxMatch].match = true;
        this.data.matches[tip.idxMatch].content = tip.oldText;
        this.removeChange(index);
    };
    TextProcessedComponent.prototype.removeChange = function (index) {
        if (this.dataChangesInText.length) {
            if (index > -1 && !this.dataChangesInText[index].disabled) {
                this.dataChangesInText.splice(index, 1);
            }
        }
        else {
            this.dataChangesInText = [];
        }
    };
    TextProcessedComponent.prototype.returnTo = function () {
        this.router.navigate(['/texts/new']); //change route
    };
    TextProcessedComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data.editMode = true;
        var text = "";
        if (this.data.matches) {
            this.data.matches.forEach(function (item) {
                text += item.content;
            });
            this.data.content = text;
        }
        var changes = [];
        if (this.dataChangesInText) {
            this.dataChangesInText.forEach(function (element) {
                if (!element.disabled) {
                    changes.push({
                        oldText: element.oldText,
                        newText: element.newText,
                        suggestion: element.suggestion,
                    });
                }
            });
        }
        var saveText = {
            id: this.idText,
            user: this.userId,
            name: "",
            description: "",
            text: text,
            foundInconsistencies: [{
                    changesInText: changes,
                    foundInconsistenciesNumber: this.data.inconsistencies != null ? this.data.inconsistencies.length : 0,
                    appliedSuggestionsNumber: changes.length
                }]
        };
        var dialogRef = this.dialog.open(_text_historic_form_text_historic_form_component__WEBPACK_IMPORTED_MODULE_8__["TextHistoricFormComponent"], { data: { editMode: this.data.editMode, idText: this.data.idText } });
        dialogRef.
            afterClosed()
            .subscribe(function (result) {
            if (result) {
                saveText.name = result.name;
                saveText.description = result.description;
                if ((_this.idText != null && _this.data.idText != 0) && _this.data.editMode) {
                    _this.textsService
                        .updateHistoricText(_this.idText, saveText)
                        .subscribe(function (response) {
                        _this.data.editMode = true;
                        _this.setFormText(text, _this.idText, true);
                        console.log("this.formText.value: ", _this.formText.value);
                        _this.checkText(_this.formText.value);
                        _this.router.navigate(['texts/text-processed/', response.id]);
                    });
                }
                else {
                    _this.textsService
                        .postHistoryChangesText(saveText)
                        .subscribe(function (response) {
                        _this.data.editMode = true;
                        _this.setFormText(text, _this.idText, true);
                        _this.checkText(_this.formText.value);
                        _this.router.navigate(['texts/text-processed/', response.id]);
                    });
                }
            }
        });
    };
    TextProcessedComponent.prototype.setFormText = function (content, idText, editMode) {
        this.formText.get('editMode').setValue(editMode);
        this.formText.get('content').setValue(content);
        if (idText != null && idText != 0)
            this.formText.get('idText').setValue(idText);
    };
    TextProcessedComponent.prototype.rebuildText = function () {
        var text = "";
        var dataFilter = [];
        for (var _i = 0, _a = this.data.matches; _i < _a.length; _i++) {
            var match = _a[_i];
            text += match.content;
        }
        if (this.data.editMode && this.idText) {
            this.formText.get('idText').setValue(this.idText);
            this.formText.get('editMode').setValue(true);
        }
        this.formText.get('content').setValue(text);
        return this.formText.value; //;{ content: text, filter: 'USERS', dataFilter: dataFilter };    
    };
    TextProcessedComponent.prototype.postText = function () {
        var _this = this;
        if (this.data.matches) {
            var data_1 = [];
            this.textsService.currentMessageUser.subscribe(function (message) {
                data_1 = message;
            });
            this.formText.get('filter').setValue(data_1.filter);
            this.formText.get('dataFilter').setValue(data_1.dataFilter);
            this.textsService.postText(this.rebuildText()).subscribe(function (data) {
                _this.textsService.updateData(data); //shared the data
            });
        }
    };
    TextProcessedComponent.prototype.disabledChangeInText = function () {
        if (this.dataChangesInText.length) {
            this.dataChangesInText.forEach(function (element) {
                element.disabled = true;
            });
        }
    };
    TextProcessedComponent.prototype.resubmitText = function () {
        var _this = this;
        var dialog2 = this.dialog.open(_test_test_component__WEBPACK_IMPORTED_MODULE_0__["TestComponent"], { data: { content: 'Explicar verificar novamente', buttonConfirm: 'Sim, eu quero selecionar outras regras', buttonCancel: 'Não, eu quero verificar com as regras atuais', title: 'Deseja alterar regras de revisão' } });
        dialog2.afterClosed().subscribe(function (response) {
            if (response) {
                var dialog3 = _this.dialog.open(_text_filter_by_users_text_filter_by_users_component__WEBPACK_IMPORTED_MODULE_1__["TextFilterByUsersComponent"], { height: '90%' });
                dialog3.afterClosed().subscribe(function (response) {
                    _this.disabledChangeInText();
                    _this.postText();
                });
            }
            else if (response == false) {
                _this.disabledChangeInText();
                _this.postText();
            }
        });
    };
    TextProcessedComponent.prototype.postSharedTextSelected = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_text_shared_dialog_text_shared_dialog_component__WEBPACK_IMPORTED_MODULE_10__["TextSharedDialogComponent"], { width: '80%', disableClose: true });
        dialogRef
            .afterClosed()
            .subscribe(function (result) {
            if (result.length) {
                var idUser = _this.authService.getUserId();
                var idText = _this.data.idText; //this.activatedRoute.params['id']   
                var sharedUser = result;
                var data = {
                    onwerUser: idUser,
                    sharedUser: '',
                    historyChangesText: idText
                };
                for (var _i = 0, sharedUser_1 = sharedUser; _i < sharedUser_1.length; _i++) {
                    var user = sharedUser_1[_i];
                    data.sharedUser = user;
                    _this.textsService.postSharedText(data).subscribe(function (response) {
                        console.log("Enviar email selected: ", response);
                        //enviar email aqui
                    });
                }
            }
        });
    };
    TextProcessedComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_6__["Component"])({
            selector: 'app-text-processed',
            template: __webpack_require__(/*! ./text-processed.component.html */ "./src/app/texts/text-processed/text-processed.component.html"),
            styles: [__webpack_require__(/*! ./text-processed.component.css */ "./src/app/texts/text-processed/text-processed.component.css")]
        }),
        __metadata("design:paramtypes", [_texts_service__WEBPACK_IMPORTED_MODULE_5__["TextsService"],
            _login_auth_service__WEBPACK_IMPORTED_MODULE_9__["AuthService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], TextProcessedComponent);
    return TextProcessedComponent;
}());



/***/ }),

/***/ "./src/app/texts/text-shared-dialog/text-shared-dialog.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/texts/text-shared-dialog/text-shared-dialog.component.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-form {\n  width: 100%;\n}\n\n.example-full-width {\n  width: 100%;\n}"

/***/ }),

/***/ "./src/app/texts/text-shared-dialog/text-shared-dialog.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/texts/text-shared-dialog/text-shared-dialog.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"header-color-primary\">\n  <mat-card-header>\n    <mat-card-title>Compartilhar texto com outras pessoas</mat-card-title>\n  </mat-card-header>\n  <form class=\"example-form\">\n    <mat-form-field class=\"example-full-width\">\n      <input type=\"text\"\n            placeholder=\"Nome ou Email\" \n            matInput\n            [formControl]=\"myControl\"\n            [matAutocomplete]=\"auto\">\n      <mat-autocomplete #auto=\"matAutocomplete\">\n        <mat-option *ngFor=\"let option of filteredOptions | async; let idx = index\" \n                    [value]=\"option.first_name +' ' + option.last_name + ' <' + option.email + '>'\"\n                    (click)=\"getUserEmail(option)\">\n          {{ option.first_name +' ' + option.last_name + ' <' + option.email + '>' }}\n        </mat-option>\n      </mat-autocomplete>\n    </mat-form-field>\n    <mat-card [style.display]=\"filteredUsers.length>0 ? 'block' : 'none'\">\n      <div>\n        <span *ngFor=\"let item of filteredUsers; let idx = index\"\n              (click)=\"removeEmailUser(idx)\" matTooltip=\"Remover\" style=\"border-bottom: 1px dotted black\">\n          <span *ngIf=\"idx>=1\">; </span> {{ item.first_name + ' ' + item.last_name }} </span>\n      </div>\n    </mat-card>\n    <mat-card-actions>\n      <div style=\"float: right;\">\n          <button mat-raised-button color=primary [mat-dialog-close]=\"userIds\" [disabled]=\"userIds.length == 0\">Compartilhar</button>\n          <button mat-button color=primary [mat-dialog-close]=[]>Cancelar</button>\n      </div>\n    </mat-card-actions>\n  </form>\n</mat-card>\n\n\n"

/***/ }),

/***/ "./src/app/texts/text-shared-dialog/text-shared-dialog.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/texts/text-shared-dialog/text-shared-dialog.component.ts ***!
  \**************************************************************************/
/*! exports provided: TextSharedDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextSharedDialogComponent", function() { return TextSharedDialogComponent; });
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _users_users_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../users/users.service */ "./src/app/users/users.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TextSharedDialogComponent = /** @class */ (function () {
    function TextSharedDialogComponent(usersService, matDialogRef) {
        this.usersService = usersService;
        this.matDialogRef = matDialogRef;
        this.myControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.options = [];
        this.optionsUsers = [];
        this.filteredUsers = [];
        this.userIds = [];
    }
    TextSharedDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.usersService.getUsers().subscribe(function (response) {
            _this.options = response;
            console.log(response);
        });
        this.filteredOptions = this.myControl.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (value) { return _this._filter(value); }));
    };
    TextSharedDialogComponent.prototype._filter = function (value) {
        var filterValue = value.toLowerCase();
        var filter = this.options.filter(function (option) { return (option.first_name + ' ' + option.last_name + ' <' + option.email + '>')
            .toLowerCase().includes(filterValue); });
        if (filter.length == 1)
            this.getUserEmail(filter[0]);
        return filter;
    };
    TextSharedDialogComponent.prototype.getUserEmail = function (user) {
        this.filteredUsers.push(user);
        this.userIds.push(user.id);
        this.filteredUsers = Array.from(new Set(this.filteredUsers)); //primeira opção, segunda remover email já utilizado
        this.userIds = Array.from(new Set(this.userIds));
        this.myControl.setValue("");
    };
    TextSharedDialogComponent.prototype.removeEmailUser = function (index) {
        if (this.filteredUsers.length) {
            if (index > -1) {
                this.filteredUsers.splice(index, 1);
            }
        }
    };
    TextSharedDialogComponent.prototype.closeModal = function () {
        this.matDialogRef.close();
    };
    TextSharedDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-text-shared-dialog',
            template: __webpack_require__(/*! ./text-shared-dialog.component.html */ "./src/app/texts/text-shared-dialog/text-shared-dialog.component.html"),
            styles: [__webpack_require__(/*! ./text-shared-dialog.component.css */ "./src/app/texts/text-shared-dialog/text-shared-dialog.component.css")]
        }),
        __metadata("design:paramtypes", [_users_users_service__WEBPACK_IMPORTED_MODULE_4__["UsersService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_0__["MatDialogRef"]])
    ], TextSharedDialogComponent);
    return TextSharedDialogComponent;
}());



/***/ }),

/***/ "./src/app/texts/text-shared-with-me/text-shared-with-me.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/texts/text-shared-with-me/text-shared-with-me.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container-shared-table {\n    overflow: auto;\n    max-height: 500px;\n    margin-top: 10px;\n}\n\ntable {\n    width: 100%;\n}\n\nth.mat-sort-header-sorted {\n    color: white !important;\n}"

/***/ }),

/***/ "./src/app/texts/text-shared-with-me/text-shared-with-me.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/texts/text-shared-with-me/text-shared-with-me.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <div fxLayout=\"col\" fxLayoutAlign=\"start center\" class=\"boxButtons\">\n    <div fxFlex=\"85%\">\n      <mat-form-field fxFlex=\"50%\">\n        <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Buscar\">\n        <mat-icon class=\"mouse-cursor-pointer\"  matSuffix>{{ 'search' }}</mat-icon>\n      </mat-form-field>\n    </div>\n    <div [style.display]=\"selection.selected.length > 1 ? 'block' : 'none'\">\n      <div style=\"float: right; padding: 10px\">\n        <button mat-button color=\"primary\"\n                (click)=\"deleteSharedText()\">\n          Excluir selecionados \n          <mat-icon matSuffix > {{ 'delete' }}</mat-icon>\n        </button>\n      </div>\n    </div>\n  </div>\n  <table class=\"mat-elevation-z8 container-shared-table\" mat-table [dataSource]=\"dataSource\" matSort>\n    <ng-container matColumnDef=\"select\">\n      <th mat-header-cell *matHeaderCellDef>\n        <mat-checkbox (change)=\"$event ? masterToggle() : null\"\n                      [checked]=\"selection.hasValue() && isAllSelected()\"\n                      [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\n        </mat-checkbox>\n      </th>\n      <td mat-cell *matCellDef=\"let row\">\n        <mat-checkbox (click)=\"$event.stopPropagation()\"\n                      (change)=\"$event ? selection.toggle(row) : null\"\n                      [checked]=\"selection.isSelected(row)\">\n        </mat-checkbox>\n      </td>\n    </ng-container>\n\n    <!-- Name Column -->\n    <ng-container matColumnDef=\"textName\">\n      <th mat-header-cell *matHeaderCellDef mat-sort-header> Nome </th>\n      <td mat-cell *matCellDef=\"let element\"> {{ element.textName }} </td>\n    </ng-container>\n  \n    <!-- Weight Column -->\n    <ng-container matColumnDef=\"onwerName\">\n      <th mat-header-cell *matHeaderCellDef mat-sort-header> Compartilhado por </th>\n      <td mat-cell *matCellDef=\"let element\"> {{ element.onwerName }} </td>\n    </ng-container>\n  \n    <!-- Symbol Column -->\n    <ng-container matColumnDef=\"created\">\n      <th mat-header-cell *matHeaderCellDef mat-sort-header> Data de compartilhamento </th>\n      <td mat-cell *matCellDef=\"let element\"> {{ element.created | date:'dd-MMMM-yyyy' }} </td>\n    </ng-container>\n\n    <ng-container matColumnDef=\"option\">\n      <th mat-header-cell *matHeaderCellDef></th>\n      <td mat-cell *matCellDef=\"let element\">\n          <mat-icon class=\"mouse-cursor-pointer\"  matSuffix [style.display]=\"isOnlyOneSelected(element) ?'none':'inherit'\" (click)=\"redirectTo(element)\" class=\"mouse-cursor-pointer\">{{ 'visibility' }}</mat-icon>\n          <mat-icon class=\"mouse-cursor-pointer\"  matSuffix [style.display]=\"isOnlyOneSelected(element) ?'none':'inherit'\" (click)=\"deleteSharedText(element)\" class=\"mouse-cursor-pointer\">{{ 'delete' }}</mat-icon>\n        </td>\n    </ng-container>\n  \n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: true\"></tr>\n    <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n  </table>\n</div>"

/***/ }),

/***/ "./src/app/texts/text-shared-with-me/text-shared-with-me.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/texts/text-shared-with-me/text-shared-with-me.component.ts ***!
  \****************************************************************************/
/*! exports provided: TextSharedWithMeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextSharedWithMeComponent", function() { return TextSharedWithMeComponent; });
/* harmony import */ var _login_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../login/auth.service */ "./src/app/login/auth.service.ts");
/* harmony import */ var _test_test_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../test/test.component */ "./src/app/test/test.component.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/esm5/collections.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _texts_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../texts.service */ "./src/app/texts/texts.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var TextSharedWithMeComponent = /** @class */ (function () {
    function TextSharedWithMeComponent(textsService, router, dialog, authService) {
        this.textsService = textsService;
        this.router = router;
        this.dialog = dialog;
        this.authService = authService;
        this.dataSharedTexts = [];
        this.displayedColumns = ['select', 'textName', 'onwerName', 'created', 'option'];
        this.dataSource = [];
        this.selection = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_3__["SelectionModel"](true, []);
    }
    TextSharedWithMeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource.sort = this.sort;
        var id = this.authService.getUserId();
        this.textsService.getSharedWithMe(id).subscribe(function (response) {
            _this.dataSharedTexts = response;
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"](response);
            console.log(response);
        });
    };
    TextSharedWithMeComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    TextSharedWithMeComponent.prototype.redirectTo = function (item) {
        var _this = this;
        var data = item.dataId;
        data.visited = true;
        this.textsService.updateSharedText(item.id, data).subscribe(function (response) {
            _this.router.navigate(['texts/text-view-corrections/', item.idText]);
        });
    };
    /** Whether the number of selected elements matches the total number of rows. */
    TextSharedWithMeComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    TextSharedWithMeComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    TextSharedWithMeComponent.prototype.isOnlyOneSelected = function (element) {
        return (this.selection.selected.length == 1 && element.id == this.selection.selected[0].id) ? false : true;
    };
    TextSharedWithMeComponent.prototype.refreshTable = function () {
        var _this = this;
        this.textsService.getSharedWithMe(this.authService.getUserId()).subscribe(function (response) {
            _this.dataSharedTexts = response;
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"](response);
            console.log(response);
        });
    };
    TextSharedWithMeComponent.prototype.deleteSharedText = function () {
        var _this = this;
        var length = this.selection.selected.length;
        var title = length > 1 ? 'Deseja remover os textos compartilhados selecionados.' : 'Deseja remover o texto compatilhado?';
        var content = 'Após essa operação ' + length + (length > 1 ? ' registros serão excluídos.' : 'registro será excluído.');
        var dialogRef = this.dialog.open(_test_test_component__WEBPACK_IMPORTED_MODULE_1__["TestComponent"], { data: { title: title, content: content, buttonConfirm: 'Sim', buttonCancel: 'Não' } });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log("Dialog result: " + result);
            if (result) {
                if (length) {
                    _this.selection.selected.forEach(function (item, index) {
                        _this.textsService.deleteSharedText(item.id).subscribe(function (response) {
                            console.log("Foi deletado: ", item.id);
                            if (index == length - 1) {
                                _this.refreshTable();
                                _this.selection.clear();
                            }
                        });
                    });
                }
            }
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSort"])
    ], TextSharedWithMeComponent.prototype, "sort", void 0);
    TextSharedWithMeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["Component"])({
            selector: 'app-text-shared-with-me',
            template: __webpack_require__(/*! ./text-shared-with-me.component.html */ "./src/app/texts/text-shared-with-me/text-shared-with-me.component.html"),
            styles: [__webpack_require__(/*! ./text-shared-with-me.component.css */ "./src/app/texts/text-shared-with-me/text-shared-with-me.component.css")]
        }),
        __metadata("design:paramtypes", [_texts_service__WEBPACK_IMPORTED_MODULE_5__["TextsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            _login_auth_service__WEBPACK_IMPORTED_MODULE_0__["AuthService"]])
    ], TextSharedWithMeComponent);
    return TextSharedWithMeComponent;
}());



/***/ }),

/***/ "./src/app/texts/text-view-corrections/text-view-corrections.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/texts/text-view-corrections/text-view-corrections.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%;\n}\n.container-shared-table {\n  max-height: 400px;\n  overflow: auto;\n}\nth.mat-sort-header-sorted {\n  color: black;\n}\n#boxSuggestion {\n  padding: 10px;\n  margin: 2px;\n  display: inline-flex;\n  word-break: break-all;\n  border: 1px solid black;\n  border-radius: 5px;\n}\n#boxCards {\n  padding: 10px;\n  margin: 2px;\n  display: inline-flex;\n  word-break: break-all;\n  border-radius: 5px;\n}\n#text-corrections {\n  width: 100%;\n  min-height: 600px\n}"

/***/ }),

/***/ "./src/app/texts/text-view-corrections/text-view-corrections.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/texts/text-view-corrections/text-view-corrections.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" style=\"margin-top: 10px\">\n  <div fxFlex=\"100%\">\n    <mat-accordion>\n      <mat-expansion-panel (opened)=\"!panelOpenInfoText\"\n                            (closed)=\"panelOpenInfoText\"\n                            class=\"header-color\">\n        <mat-expansion-panel-header>\n          <mat-panel-title>\n            Informações Gerais\n          </mat-panel-title>\n          <mat-panel-description>\n          </mat-panel-description>\n        </mat-expansion-panel-header>\n        <div fxLayout=\"row\">\n          <mat-card fxFlex=\"100%\">\n            <div>\n              <div><span><i>Nome:</i> {{ dataText.name }}</span></div>\n              <div><span><i>Quantidade de Revisões:</i> {{ totalRevisionNumber }}</span></div>\n              <div><span><i>Sugestões aplicadas:</i> {{ totalSuggestionsApplied }}</span></div>\n              <div><span><i>Inconsistências Encontradas:</i> {{ totalInconsistenciesFound }}</span></div>\n            </div>\n          </mat-card>\n        </div>\n        <div fxLayout=\"row\">\n            <mat-accordion fxFlex>\n                <mat-expansion-panel (opened)=\"panelOpenInfoChanges\"\n                                      (closed)=\"!panelOpenInfoChanges\"\n                                      class=\"header-color\">\n                  <mat-expansion-panel-header>\n                    <mat-panel-title>\n                      Detalhes por Revisão\n                    </mat-panel-title>\n                    <mat-panel-description>\n                    </mat-panel-description>\n                  </mat-expansion-panel-header>\n                  <div class=\"mat-elevation-z8 container-shared-table\" >\n                    <table mat-table [dataSource]=\"dataSource\">\n                \n                      <!-- Name Column -->\n                      <ng-container matColumnDef=\"revisionNumber\">\n                        <th mat-header-cell *matHeaderCellDef> Revisão </th>\n                        <td mat-cell *matCellDef=\"let element\"> {{ element.revisionNumber }} </td>\n                      </ng-container>\n                    \n                      <!-- Weight Column -->\n                      <ng-container matColumnDef=\"appliedSuggestionsNumber\">\n                        <th mat-header-cell *matHeaderCellDef> Sugestões aplicadas </th>\n                        <td mat-cell *matCellDef=\"let element\"> {{ element.appliedSuggestionsNumber }} </td>\n                      </ng-container>\n\n                      <!-- Weight Column -->\n                      <ng-container matColumnDef=\"foundInconsistenciesNumber\">\n                        <th mat-header-cell *matHeaderCellDef> Inconsistências Encontradas </th>\n                        <td mat-cell *matCellDef=\"let element\"> {{ element.foundInconsistenciesNumber }} </td>\n                      </ng-container>\n\n                      <!-- Weight Column -->\n                      <ng-container matColumnDef=\"result\">\n                        <th mat-header-cell *matHeaderCellDef> Total de Ocorrências </th>\n                        <td mat-cell *matCellDef=\"let element\"> {{ element.foundInconsistenciesNumber }} </td>\n                      </ng-container>\n\n                      <tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: true\"></tr>\n                      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n                    </table>\n                  </div>                  \n                </mat-expansion-panel>\n              </mat-accordion>\n          \n        </div>     \n      </mat-expansion-panel>\n    </mat-accordion>\n  </div>\n</div>\n\n<div fxLayout=\"col\" style=\"background-color: purple\" class=\"margin-top-10\">\n  <div fxFlex=\"100%\" style=\"background-color: yellow\">\n    <mat-accordion>\n      <mat-expansion-panel (opened)=\"panelOpenText\"\n                            (closed)=\"!panelOpenText\"\n                            class=\"header-color\">\n        <mat-expansion-panel-header>\n          <mat-panel-title>\n            Texto\n          </mat-panel-title>\n          <mat-panel-description>\n          </mat-panel-description>\n        </mat-expansion-panel-header>\n        <textarea name=\"\" id=\"text-corrections\" readonly\n        >{{ dataText.text }}</textarea>\n        <!--p style=\"border: 1px solid lightgray\">{{ dataText.text }}</p-->\n      </mat-expansion-panel>\n    </mat-accordion>\n  </div>\n\n  <!--div fxFlex=\"100%\" style=\"background-color: blue\">\n    <mat-accordion>\n      <mat-expansion-panel (opened)=\"panelOpenInfoChanges\"\n                            (closed)=\"!panelOpenInfoChanges\">\n        <mat-expansion-panel-header>\n          <mat-panel-title>\n            Alterações Aplicadas no Texto\n          </mat-panel-title>\n          <mat-panel-description>\n            Currently I am {{panelOpenInfoChanges ? 'open' : 'closed'}}\n          </mat-panel-description>\n        </mat-expansion-panel-header>\n        <p>I'm visible because I am open</p>\n      </mat-expansion-panel>\n    </mat-accordion>\n  </div-->\n</div>\n\n"

/***/ }),

/***/ "./src/app/texts/text-view-corrections/text-view-corrections.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/texts/text-view-corrections/text-view-corrections.component.ts ***!
  \********************************************************************************/
/*! exports provided: TextViewCorrectionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextViewCorrectionsComponent", function() { return TextViewCorrectionsComponent; });
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/esm5/collections.es5.js");
/* harmony import */ var _texts_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../texts.service */ "./src/app/texts/texts.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TextViewCorrectionsComponent = /** @class */ (function () {
    function TextViewCorrectionsComponent(route, router, textsService) {
        this.route = route;
        this.router = router;
        this.textsService = textsService;
        this.dataText = [];
        this.totalRevisionNumber = 0;
        this.totalInconsistenciesFound = 0;
        this.totalSuggestionsApplied = 0;
        this.displayedColumns = ['revisionNumber', 'appliedSuggestionsNumber', 'foundInconsistenciesNumber', 'result'];
        this.dataSource = [];
        this.selection = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_1__["SelectionModel"](true, []);
        this.panelOpenInfoText = false;
        this.panelOpenText = false;
        this.panelOpenInfoChanges = false;
    }
    TextViewCorrectionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this.route.snapshot.paramMap.get('id');
        console.log("Teste id: ", id);
        this.textsService
            .getTextsHistoric(id)
            .subscribe(function (response) {
            _this.dataText = response;
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_0__["MatTableDataSource"](response.foundInconsistencies);
            _this.getTextInfo();
            console.log("TExtshared: ", response);
        });
    };
    TextViewCorrectionsComponent.prototype.getTextInfo = function () {
        this.totalRevisionNumber = this.dataText.foundInconsistencies.length;
        for (var _i = 0, _a = this.dataText.foundInconsistencies; _i < _a.length; _i++) {
            var item = _a[_i];
            console.log(item);
            this.totalInconsistenciesFound += item.foundInconsistenciesNumber;
            this.totalSuggestionsApplied += item.appliedSuggestionsNumber;
        }
    };
    /** Whether the number of selected elements matches the total number of rows. */
    TextViewCorrectionsComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    TextViewCorrectionsComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    TextViewCorrectionsComponent.prototype.isOnlyOneSelected = function (element) {
        return (this.selection.selected.length == 1 && element.id == this.selection.selected[0].id) ? false : true;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_0__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_0__["MatSort"])
    ], TextViewCorrectionsComponent.prototype, "sort", void 0);
    TextViewCorrectionsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"])({
            selector: 'app-text-view-corrections',
            template: __webpack_require__(/*! ./text-view-corrections.component.html */ "./src/app/texts/text-view-corrections/text-view-corrections.component.html"),
            styles: [__webpack_require__(/*! ./text-view-corrections.component.css */ "./src/app/texts/text-view-corrections/text-view-corrections.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _texts_service__WEBPACK_IMPORTED_MODULE_2__["TextsService"]])
    ], TextViewCorrectionsComponent);
    return TextViewCorrectionsComponent;
}());



/***/ }),

/***/ "./src/app/texts/texts.component.css":
/*!*******************************************!*\
  !*** ./src/app/texts/texts.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/texts/texts.component.html":
/*!********************************************!*\
  !*** ./src/app/texts/texts.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/texts/texts.component.ts":
/*!******************************************!*\
  !*** ./src/app/texts/texts.component.ts ***!
  \******************************************/
/*! exports provided: TextsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextsComponent", function() { return TextsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TextsComponent = /** @class */ (function () {
    function TextsComponent() {
    }
    TextsComponent.prototype.ngOnInit = function () {
    };
    TextsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-texts',
            template: __webpack_require__(/*! ./texts.component.html */ "./src/app/texts/texts.component.html"),
            styles: [__webpack_require__(/*! ./texts.component.css */ "./src/app/texts/texts.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TextsComponent);
    return TextsComponent;
}());



/***/ }),

/***/ "./src/app/texts/texts.module.ts":
/*!***************************************!*\
  !*** ./src/app/texts/texts.module.ts ***!
  \***************************************/
/*! exports provided: TextsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextsModule", function() { return TextsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _app_material_app_material_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../app-material/app-material.module */ "./src/app/app-material/app-material.module.ts");
/* harmony import */ var _texts_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./texts.component */ "./src/app/texts/texts.component.ts");
/* harmony import */ var _text_form_text_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./text-form/text-form.component */ "./src/app/texts/text-form/text-form.component.ts");
/* harmony import */ var _texts_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./texts.routing.module */ "./src/app/texts/texts.routing.module.ts");
/* harmony import */ var _texts_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./texts.service */ "./src/app/texts/texts.service.ts");
/* harmony import */ var _text_processed_text_processed_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./text-processed/text-processed.component */ "./src/app/texts/text-processed/text-processed.component.ts");
/* harmony import */ var _text_processed_front_text_processed_front_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./text-processed-front/text-processed-front.component */ "./src/app/texts/text-processed-front/text-processed-front.component.ts");
/* harmony import */ var _text_historic_form_text_historic_form_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./text-historic-form/text-historic-form.component */ "./src/app/texts/text-historic-form/text-historic-form.component.ts");
/* harmony import */ var _text_historic_text_historic_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./text-historic/text-historic.component */ "./src/app/texts/text-historic/text-historic.component.ts");
/* harmony import */ var _text_filter_by_users_text_filter_by_users_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./text-filter-by-users/text-filter-by-users.component */ "./src/app/texts/text-filter-by-users/text-filter-by-users.component.ts");
/* harmony import */ var _text_filter_by_inconsistency_text_filter_by_inconsistency_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./text-filter-by-inconsistency/text-filter-by-inconsistency.component */ "./src/app/texts/text-filter-by-inconsistency/text-filter-by-inconsistency.component.ts");
/* harmony import */ var _text_shared_dialog_text_shared_dialog_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./text-shared-dialog/text-shared-dialog.component */ "./src/app/texts/text-shared-dialog/text-shared-dialog.component.ts");
/* harmony import */ var _text_view_corrections_text_view_corrections_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./text-view-corrections/text-view-corrections.component */ "./src/app/texts/text-view-corrections/text-view-corrections.component.ts");
/* harmony import */ var _text_shared_with_me_text_shared_with_me_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./text-shared-with-me/text-shared-with-me.component */ "./src/app/texts/text-shared-with-me/text-shared-with-me.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var TextsModule = /** @class */ (function () {
    function TextsModule() {
    }
    TextsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _texts_routing_module__WEBPACK_IMPORTED_MODULE_5__["TextsRoutingModule"],
                _app_material_app_material_module__WEBPACK_IMPORTED_MODULE_2__["AppMaterialModule"]
            ],
            declarations: [
                _texts_component__WEBPACK_IMPORTED_MODULE_3__["TextsComponent"],
                _text_form_text_form_component__WEBPACK_IMPORTED_MODULE_4__["TextFormComponent"],
                _text_processed_text_processed_component__WEBPACK_IMPORTED_MODULE_7__["TextProcessedComponent"],
                _text_processed_front_text_processed_front_component__WEBPACK_IMPORTED_MODULE_8__["TextProcessedFrontComponent"],
                _text_historic_form_text_historic_form_component__WEBPACK_IMPORTED_MODULE_9__["TextHistoricFormComponent"],
                _text_historic_text_historic_component__WEBPACK_IMPORTED_MODULE_10__["TextHistoricComponent"],
                _text_filter_by_users_text_filter_by_users_component__WEBPACK_IMPORTED_MODULE_11__["TextFilterByUsersComponent"],
                _text_filter_by_inconsistency_text_filter_by_inconsistency_component__WEBPACK_IMPORTED_MODULE_12__["TextFilterByInconsistencyComponent"],
                _text_shared_dialog_text_shared_dialog_component__WEBPACK_IMPORTED_MODULE_13__["TextSharedDialogComponent"],
                _text_view_corrections_text_view_corrections_component__WEBPACK_IMPORTED_MODULE_14__["TextViewCorrectionsComponent"],
                _text_shared_with_me_text_shared_with_me_component__WEBPACK_IMPORTED_MODULE_15__["TextSharedWithMeComponent"]
            ],
            providers: [
                _texts_service__WEBPACK_IMPORTED_MODULE_6__["TextsService"]
            ]
        })
    ], TextsModule);
    return TextsModule;
}());



/***/ }),

/***/ "./src/app/texts/texts.routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/texts/texts.routing.module.ts ***!
  \***********************************************/
/*! exports provided: TextsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextsRoutingModule", function() { return TextsRoutingModule; });
/* harmony import */ var _text_view_corrections_text_view_corrections_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text-view-corrections/text-view-corrections.component */ "./src/app/texts/text-view-corrections/text-view-corrections.component.ts");
/* harmony import */ var _text_shared_dialog_text_shared_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text-shared-dialog/text-shared-dialog.component */ "./src/app/texts/text-shared-dialog/text-shared-dialog.component.ts");
/* harmony import */ var _text_filter_by_inconsistency_text_filter_by_inconsistency_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./text-filter-by-inconsistency/text-filter-by-inconsistency.component */ "./src/app/texts/text-filter-by-inconsistency/text-filter-by-inconsistency.component.ts");
/* harmony import */ var _text_filter_by_users_text_filter_by_users_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./text-filter-by-users/text-filter-by-users.component */ "./src/app/texts/text-filter-by-users/text-filter-by-users.component.ts");
/* harmony import */ var _text_historic_text_historic_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./text-historic/text-historic.component */ "./src/app/texts/text-historic/text-historic.component.ts");
/* harmony import */ var _text_historic_form_text_historic_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./text-historic-form/text-historic-form.component */ "./src/app/texts/text-historic-form/text-historic-form.component.ts");
/* harmony import */ var _text_processed_front_text_processed_front_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./text-processed-front/text-processed-front.component */ "./src/app/texts/text-processed-front/text-processed-front.component.ts");
/* harmony import */ var _text_processed_text_processed_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./text-processed/text-processed.component */ "./src/app/texts/text-processed/text-processed.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _texts_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./texts.component */ "./src/app/texts/texts.component.ts");
/* harmony import */ var _text_form_text_form_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./text-form/text-form.component */ "./src/app/texts/text-form/text-form.component.ts");
/* harmony import */ var _text_shared_with_me_text_shared_with_me_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./text-shared-with-me/text-shared-with-me.component */ "./src/app/texts/text-shared-with-me/text-shared-with-me.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var textsRoutes = [
    { path: '', component: _texts_component__WEBPACK_IMPORTED_MODULE_10__["TextsComponent"], children: [
            { path: 'new', component: _text_form_text_form_component__WEBPACK_IMPORTED_MODULE_11__["TextFormComponent"] },
            { path: 'text-processed', component: _text_processed_text_processed_component__WEBPACK_IMPORTED_MODULE_7__["TextProcessedComponent"] },
            { path: 'text-processed/:id', component: _text_processed_text_processed_component__WEBPACK_IMPORTED_MODULE_7__["TextProcessedComponent"] },
            { path: 'text-processed-front', component: _text_processed_front_text_processed_front_component__WEBPACK_IMPORTED_MODULE_6__["TextProcessedFrontComponent"] },
            { path: 'text-historic-form', component: _text_historic_form_text_historic_form_component__WEBPACK_IMPORTED_MODULE_5__["TextHistoricFormComponent"] },
            { path: 'text-historic', component: _text_historic_text_historic_component__WEBPACK_IMPORTED_MODULE_4__["TextHistoricComponent"] },
            { path: 'text-filter-by-users', component: _text_filter_by_users_text_filter_by_users_component__WEBPACK_IMPORTED_MODULE_3__["TextFilterByUsersComponent"] },
            { path: 'text-shared-dialog', component: _text_shared_dialog_text_shared_dialog_component__WEBPACK_IMPORTED_MODULE_1__["TextSharedDialogComponent"] },
            { path: 'text-filter-by-inconsistency', component: _text_filter_by_inconsistency_text_filter_by_inconsistency_component__WEBPACK_IMPORTED_MODULE_2__["TextFilterByInconsistencyComponent"] },
            { path: 'text-view-corrections', component: _text_view_corrections_text_view_corrections_component__WEBPACK_IMPORTED_MODULE_0__["TextViewCorrectionsComponent"] },
            { path: 'text-view-corrections/:id', component: _text_view_corrections_text_view_corrections_component__WEBPACK_IMPORTED_MODULE_0__["TextViewCorrectionsComponent"] },
            { path: 'text-shared-with-me', component: _text_shared_with_me_text_shared_with_me_component__WEBPACK_IMPORTED_MODULE_12__["TextSharedWithMeComponent"] }
            /*{ path: ':id',
              component: UserDetailsComponent,
              resolve: { user: UsersDetailsResolver}
           },
            /*{ path: ':id/edit',
              component: UserFormComponent,
              canDeactivate: [UsersDeactivateGuard]
            }*/
        ] }
];
var TextsRoutingModule = /** @class */ (function () {
    function TextsRoutingModule() {
    }
    TextsRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_8__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterModule"].forChild(textsRoutes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterModule"]]
        })
    ], TextsRoutingModule);
    return TextsRoutingModule;
}());



/***/ })

}]);
//# sourceMappingURL=texts-texts-module.js.map