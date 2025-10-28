"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PruebaModule = void 0;
const common_1 = require("@nestjs/common");
const prueba_service_1 = require("./prueba.service");
const prueba_controller_1 = require("./prueba.controller");
let PruebaModule = class PruebaModule {
};
exports.PruebaModule = PruebaModule;
exports.PruebaModule = PruebaModule = __decorate([
    (0, common_1.Module)({
        providers: [prueba_service_1.PruebaService],
        controllers: [prueba_controller_1.PruebaController]
    })
], PruebaModule);
//# sourceMappingURL=prueba.module.js.map