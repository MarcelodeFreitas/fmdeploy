"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.FormikStep = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var formik_1 = require("formik");
var core_1 = require("@material-ui/core");
function FormikStep(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
}
exports.FormikStep = FormikStep;
var defaultState = {
    title: "",
    description: "",
    inputType: "",
    outputType: "",
    isPrivate: true,
    modelFiles: [],
    pythonScript: "",
    errorPythonScript: "",
    errorModelFiles: "",
    projectId: "",
    projectCreatedMessage: "Model created successfully",
    pythonScriptMessage: "Python Script uploaded successfully",
    modelFilesMessage: "Model Files uploaded successfully"
};
function FormikStepper(_a) {
    var _this = this;
    var children = _a.children, props = __rest(_a, ["children"]);
    var childrenArray = react_1.Children.toArray(children);
    console.log("reee: ", childrenArray);
    var _b = (0, react_1.useState)(0), step = _b[0], setStep = _b[1];
    var _c = (0, react_1.useState)(defaultState), state = _c[0], setState = _c[1];
    var currentChild = childrenArray[step];
    console.log("currentChild: ", currentChild);
    var _d = (0, react_1.useState)(false), completed = _d[0], setCompleted = _d[1];
    function isLastStep() {
        return step === childrenArray.length - 1;
    }
    function isPenultimate() {
        return step === childrenArray.length - 2;
    }
    return (0, jsx_runtime_1.jsx)(formik_1.Formik, __assign({}, props, { validationSchema: currentChild.props.validationSchema, onSubmit: function (values, helpers) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!isPenultimate()) return [3 /*break*/, 2];
                        _a = setState;
                        return [4 /*yield*/, props.onSubmit(values, helpers)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]);
                        setCompleted(true);
                        setStep(function (s) { return s + 1; });
                        return [3 /*break*/, 3];
                    case 2:
                        /* console.log(props) */
                        //next step
                        setStep(function (s) { return s + 1; });
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); } }, { children: function (_a) {
            var isSubmitting = _a.isSubmitting, resetForm = _a.resetForm;
            return ((0, jsx_runtime_1.jsxs)(formik_1.Form, __assign({ autoComplete: "off" }, { children: [(0, jsx_runtime_1.jsx)(core_1.Stepper, __assign({ alternativeLabel: true, activeStep: step }, { children: childrenArray.map(function (child, index) { return ((0, jsx_runtime_1.jsx)(core_1.Step, __assign({ completed: step > index || completed }, { children: (0, jsx_runtime_1.jsx)(core_1.StepLabel, { children: child.props.label }) }), child.props.label)); }) })), currentChild, (0, jsx_runtime_1.jsxs)(core_1.Grid, __assign({ container: true, spacing: 2 }, { children: [(step > 0 && step < 2) ? ((0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true }, { children: (0, jsx_runtime_1.jsx)(core_1.Button, __assign({ disabled: isSubmitting, variant: "contained", color: "primary", onClick: function () { return setStep(function (s) { return s - 1; }); } }, { children: "Back" })) }))) : null, step < 2 ? ((0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true }, { children: (0, jsx_runtime_1.jsx)(core_1.Button, __assign({ startIcon: isSubmitting ? (0, jsx_runtime_1.jsx)(core_1.CircularProgress, { size: "1rem" }) : null, disabled: isSubmitting, variant: "contained", color: "primary", type: "submit" }, { children: isSubmitting ? 'Submitting' : isPenultimate() ? 'Submit' : 'Next' })) }))) : null, (state.projectCreatedMessage !== "Project created successfully" || state.pythonScriptMessage !== "Python Script uploaded successfully" || state.modelFilesMessage !== "Model Files uploaded successfully") && isLastStep() ? ((0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true }, { children: (0, jsx_runtime_1.jsx)(core_1.Button, __assign({ disabled: isSubmitting, variant: "contained", color: "primary", onClick: function () { return setStep(function (s) { return s - 1; }); } }, { children: "Back" })) })))
                                : null, isLastStep() ? ((0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true }, { children: (0, jsx_runtime_1.jsx)(core_1.Button, __assign({ disabled: isSubmitting, variant: "contained", color: "primary", type: "reset", onClick: function () { resetForm({}); setStep(0); } }, { children: "New Project" })) }))) : null] }))] })));
        } }));
}
exports["default"] = FormikStepper;
