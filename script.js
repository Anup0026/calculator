"use strict";

/* =========================================================
   COMPLEX CALCULATOR
   Symbolic: Nerdamer (Safe-guarded against infinite loops)
   Numerical: Math.js + Simpson's Rule
   ========================================================= */

const screen = document.getElementById("screen");

/* =========================================================
   1. GENERAL CALCULATOR
   ========================================================= */

document.querySelectorAll(".btn").forEach(function (button) {
    button.addEventListener("click", function () {
        if (!screen) return;

        const value = button.textContent.trim();

        if (["Infinity", "-Infinity", "NaN"].includes(screen.value) || screen.value.startsWith("Error")) {
            screen.value = "";
        }

        const replacements = {
            "×": "*",
            "÷": "/",
            "π": "pi",
            "−": "-"
        };

        screen.value += replacements[value] || value;
    });
});

function getScreenNumber() {
    if (!screen) throw new Error("Screen element nahi mila.");
    const value = Number(screen.value);

    if (!Number.isFinite(value)) {
        throw new Error("Pehle ek valid number daalein.");
    }

    return value;
}

function applyUnary(fn) {
    try {
        const result = fn(getScreenNumber());

        if (!Number.isFinite(result)) {
            throw new Error("Result is beyond the real domain.");
        }

        screen.value = String(result);
    } catch (error) {
        alert(error.message);
    }
}

function sin() { applyUnary(x => Math.sin((x * Math.PI) / 180)); }
function cos() { applyUnary(x => Math.cos((x * Math.PI) / 180)); }
function tan() { applyUnary(x => Math.tan((x * Math.PI) / 180)); }
function pow() { applyUnary(x => x * x); }
function sqrt() { applyUnary(Math.sqrt); }
function cube() { applyUnary(x => x * x * x); }

function inverse() {
    applyUnary(x => {
        if (x === 0) throw new Error("It can not be divide by zero.");
        return 1 / x;
    });
}

function log() { applyUnary(Math.log); }
function log10() { applyUnary(Math.log10); }
function pi() { if (screen) screen.value = String(Math.PI); }
function e() { if (screen) screen.value = String(Math.E); }

function sininverse() { applyUnary(x => (Math.asin(x) * 180) / Math.PI); }
function cosinverse() { applyUnary(x => (Math.acos(x) * 180) / Math.PI); }
function taninverse() { applyUnary(x => (Math.atan(x) * 180) / Math.PI); }

function tenPowX() { applyUnary(x => Math.pow(10, x)); }

function factorial(n) {
    if (!Number.isInteger(n) || n < 0 || n > 170) {
        throw new Error(" for calculating the Factorial integer should between 0 to 170.");
    }
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

function fact() { applyUnary(factorial); }

function npr() {
    try {
        const n = getScreenNumber();
        const r = Number(prompt("Enter r:"));

        if (!Number.isInteger(n) || !Number.isInteger(r) || n < 0 || r < 0 || r > n) {
            throw new Error("0 <= r <= n Pleaser Enter valid integer.");
        }

        let result = 1;
        for (let i = 0; i < r; i++) result *= (n - i);
        screen.value = String(result);
    } catch (error) {
        alert(error.message);
    }
}

function ncr() {
    try {
        const n = getScreenNumber();
        const r = Number(prompt("Enter r:"));

        if (!Number.isInteger(n) || !Number.isInteger(r) || n < 0 || r < 0 || r > n) {
            throw new Error("0 <= r <= n Enter the valid integer.");
        }

        const k = Math.min(r, n - r);
        let result = 1;
        for (let i = 1; i <= k; i++) {
            result = (result * (n - k + i)) / i;
        }
        screen.value = String(result);
    } catch (error) {
        alert(error.message);
    }
}

function backspc() {
    if (screen) screen.value = screen.value.slice(0, -1);
}
function backspace() { backspc(); }
function clearScreen() { if (screen) screen.value = ""; }

function calculate() {
    try {
        if (!screen || !screen.value.trim()) {
            throw new Error("Put your Expression.");
        }

        let expr = screen.value
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/−/g, "-")
            .replace(/π/g, "pi");

        const result = math.evaluate(expr);

        if (typeof result !== "number" || !Number.isFinite(result)) {
            throw new Error("Sory! , We are unable to get Valid finite real number .");
        }

        screen.value = String(result);
    } catch (error) {
        alert("Calculation error: " + error.message);
    }
}

function sinh() { applyUnary(Math.sinh); }
function cosh() { applyUnary(Math.cosh); }
function tanh() { applyUnary(Math.tanh); }
function sinhInverse() { applyUnary(Math.asinh); }
function coshInverse() { applyUnary(Math.acosh); }
function tanhInverse() { applyUnary(Math.atanh); }
function cubeRoot() { applyUnary(Math.cbrt); }
function absolute() { applyUnary(Math.abs); }

function power() {
    try {
        const x = getScreenNumber();
        const y = Number(prompt("Enter power:"));
        if (!Number.isFinite(y)) throw new Error("Invalid exponent.");
        const result = Math.pow(x, y);
        if (!Number.isFinite(result)) throw new Error("Result is outside the range .");
        screen.value = String(result);
    } catch (error) {
        alert(error.message);
    }
}

function logBase() {
    try {
        const base = Number(prompt("Enter base:"));
        const x = getScreenNumber();
        if (!Number.isFinite(base) || base <= 0 || base === 1 || x <= 0) {
            throw new Error("Invalid logarithm base or argument.");
        }
        screen.value = String(Math.log(x) / Math.log(base));
    } catch (error) {
        alert(error.message);
    }
}

function mod() {
    try {
        const x = getScreenNumber();
        const divisor = Number(prompt("Enter divisor:"));
        if (!Number.isFinite(divisor) || divisor === 0) throw new Error("Divisor must be nonzero .");
        screen.value = String(x % divisor);
    } catch (error) {
        alert(error.message);
    }
}

function factorialDouble() {
    try {
        let n = getScreenNumber();
        if (!Number.isInteger(n) || n < 0 || n > 300) throw new Error("Enter integer between 0 to 300.");
        let result = 1;
        for (; n > 1; n -= 2) result *= n;
        screen.value = String(result);
    } catch (error) {
        alert(error.message);
    }
}

function naturalLog1p() { applyUnary(Math.log1p); }
function expFunction() { applyUnary(Math.exp); }
function asinHyperbolic() { applyUnary(Math.asinh); }
function acosHyperbolic() { applyUnary(Math.acosh); }
function atanHyperbolic() { applyUnary(Math.atanh); }
function signFunction() { applyUnary(Math.sign); }
function roundFunction() { applyUnary(Math.round); }
function floorFunction() { applyUnary(Math.floor); }

function cot() {
    applyUnary(x => {
        const t = Math.tan((x * Math.PI) / 180);
        if (Math.abs(t) < 1e-14) throw new Error("Cotangent is undefined .");
        return 1 / t;
    });
}

function sec() {
    applyUnary(x => {
        const c = Math.cos((x * Math.PI) / 180);
        if (Math.abs(c) < 1e-14) throw new Error("Secant is undefined.");
        return 1 / c;
    });
}

function csc() {
    applyUnary(x => {
        const s = Math.sin((x * Math.PI) / 180);
        if (Math.abs(s) < 1e-14) throw new Error("Cosecant is undefined .");
        return 1 / s;
    });
}

function coth() {
    applyUnary(x => {
        if (x === 0) throw new Error("Coth  is undefined on the value zero.");
        return 1 / Math.tanh(x);
    });
}

function sech() { applyUnary(x => 1 / Math.cosh(x)); }
function csch() {
    applyUnary(x => {
        if (x === 0) throw new Error("Csch is undefined on the value zero.");
        return 1 / Math.sinh(x);
    });
}

function cotInverse() { applyUnary(x => (Math.atan2(1, x) * 180) / Math.PI); }
function secInverse() {
    applyUnary(x => {
        if (Math.abs(x) < 1) throw new Error(" for the Real arcsec it should be  |x| >= 1 .");
        return (Math.acos(1 / x) * 180) / Math.PI;
    });
}

function cscInverse() {
    applyUnary(x => {
        if (Math.abs(x) < 1) throw new Error("for the Real arccsc it should be  |x| >= 1 .");
        return (Math.asin(1 / x) * 180) / Math.PI;
    });
}

function cothInverse() {
    applyUnary(x => {
        if (Math.abs(x) <= 1) throw new Error("for the Real arccoth it should be |x| > 1 .");
        return 0.5 * Math.log((x + 1) / (x - 1));
    });
}

function sechInverse() {
    applyUnary(x => {
        if (x <= 0 || x > 1) throw new Error("for the Real arcsech should lie between 0 < x <= 1 .");
        return Math.acosh(1 / x);
    });
}

function cschInverse() {
    applyUnary(x => {
        if (x === 0) throw new Error("This  Real arccsch it is undefined .");
        return Math.asinh(1 / x);
    });
}

/* =========================================================
   2. ULTRA ROBUST INPUT NORMALIZATION
   ========================================================= */

function normalizeIntegrationInput(input, variable) {
    let expr = input.trim().toLowerCase();
    const v = variable.trim().toLowerCase();

    if (!expr) throw new Error("Function enter karein.");
    if (!/^[a-z][a-z0-9_]*$/.test(v)) throw new Error("Please Enter Valid variable .");

    expr = expr
        .replace(/π/g, "pi")
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-");

    const functions = [
        "asinh", "acosh", "atanh",
        "asin", "acos", "atan",
        "sinh", "cosh", "tanh",
        "csch", "sech", "coth",
        "sqrt", "sin", "cos", "tan",
        "csc", "sec", "cot", "exp",
        "log", "ln"
    ];

    functions.sort((a, b) => b.length - a.length);


    const fnList = functions.join("|");
    expr = expr.replace(new RegExp(`([a-z0-9_\\^\\)])(${fnList})`, "gi"), "$1*$2");


    for (const fn of functions) {
        const compactRegex = new RegExp(`(?<![a-z])${fn}\\s*([a-z0-9_]+)`, "gi");
        expr = expr.replace(compactRegex, (match, arg) => {
            if (arg.startsWith("(")) return match;
            return `${fn}(${arg})`;
        });
    }


    const innerArgRegex = new RegExp(`\\((([0-9]+|[a-z]+))(${v})\\)`, "gi");
    expr = expr.replace(innerArgRegex, "($1*$3)");


    expr = expr.replace(/(\d)([a-z(])/gi, "$1*$2");
    expr = expr.replace(/(\))([a-z0-9(])/gi, "$1*$2");

    return expr;
}

/* =========================================================
   SPECIAL SOLVER: x^k * sin/cos & NON-ELEMENTARY PATTERNS
   ========================================================= */

function solveXPowTrig(k, fnName, a, variable) {
    const v = variable;

    function term(p) {
        if (p === 0) return "";
        if (p === 1) return `${v}*`;
        return `${v}^${p}*`;
    }

    function reduce(m) {
        if (m === 0) {
            return {
                sinPart: `-cos(${a}*${v})/${a}`,
                cosPart: `sin(${a}*${v})/${a}`
            };
        }

        const prev = reduce(m - 1);
        const curSin = `(-${term(m)}cos(${a}*${v})/${a} + (${m}/${a})*(${prev.cosPart}))`;
        const curCos = `(${term(m)}sin(${a}*${v})/${a} - (${m}/${a})*(${prev.sinPart}))`;

        return { sinPart: curSin, cosPart: curCos };
    }

    if (fnName === "sin") return reduce(k).sinPart;
    if (fnName === "cos") return reduce(k).cosPart;
    if (fnName === "tan") {
        throw new Error(
            `Integral of ${v}^${k}*tan(${a}*${v}) it is not possibel in the elementry function. Please use Numerical Integration .`
        );
    }
}

function handleSpecialIntegrals(expr, variable) {
    const v = variable;

    // Pattern 1: x^k * sin/cos/tan(a*x)
    const trigPattern = new RegExp(
        `^(?:${v}\\^(\\d+)|${v})\\s*\\*\\s*(sin|cos|tan)\\((?:(\\d+)\\*)?${v}\\)$`,
        "i"
    );
    const trigMatch = expr.match(trigPattern);
    if (trigMatch) {
        const k = trigMatch[1] !== undefined ? parseInt(trigMatch[1], 10) : 1;
        const fnName = trigMatch[2].toLowerCase();
        const a = trigMatch[3] !== undefined ? parseInt(trigMatch[3], 10) : 1;
        return solveXPowTrig(k, fnName, a, v);
    }

    // Pattern 2: a^x * log(x) ya generic b^x * ln(x) -> Non-elementary check (prevents browser crash)
    if (new RegExp(`[a-z0-9_]+\\^${v}\\s*\\*\\s*(log|ln)\\(${v}\\)`, "i").test(expr) ||
        new RegExp(`(log|ln)\\(${v}\\)\\s*\\*\\s*[a-z0-9_]+\\^${v}`, "i").test(expr)) {
        throw new Error(
            `∫ ${expr} d${v}  This is the non-elementary integral  (this demand  Special Exponential Integrals / Series ).For calculating the exact value Exact value use the numerical button.`
        );
    }

    return null;
}

/* =========================================================
   OUTPUT FORMATTER (NO POINT/DECIMALS, FRACTIONS INSTEAD)
   ========================================================= */

function formatOutput(str) {
    let formatted = str;

    const decimalMap = {
        "0.5": "(1/2)",
        "0.25": "(1/4)",
        "0.75": "(3/4)",
        "0.125": "(1/8)",
        "0.375": "(3/8)",
        "0.625": "(5/8)",
        "0.875": "(7/8)",
        "0.3333333333333333": "(1/3)",
        "0.6666666666666666": "(2/3)",
        "0.16666666666666666": "(1/6)"
    };

    for (const [dec, frac] of Object.entries(decimalMap)) {
        formatted = formatted.split(dec).join(frac);
    }

    // Negative exponents ko clean fraction / division mein convert karna
    formatted = formatted
        .replace(/\*([a-zA-Z0-9_]+)\^\(-1\)/g, "/$1")
        .replace(/\*\(([^)]+)\)\^\(-1\)/g, "/($1)")
        .replace(/([a-zA-Z0-9_]+)\^\(-1\)/g, "1/$1");

    return formatted;
}

/* =========================================================
   3. SYMBOLIC INTEGRATION (WITH LAG PREVENTER)
   ========================================================= */

function integrateFunction() {
    const output = document.getElementById("integrationResult");

    try {
        if (!output) throw new Error('HTML element is not found: id="integrationResult".');
        if (typeof nerdamer === "undefined") {
            throw new Error("Nerdamer is still not load.Check Your Internet connection .");
        }

        const inputElement = document.getElementById("integrand");
        const variableElement = document.getElementById("integrationVariable");
        const typeElement = document.getElementById("integrationType");

        if (!inputElement || !typeElement) {
            throw new Error("Please check integrand ya integrationType input IDs .");
        }

        const rawInput = inputElement.value.trim();
        const variable = variableElement ? variableElement.value.trim().toLowerCase() : "x";
        const type = typeElement.value;

        if (!rawInput) throw new Error("Please enter the function for the integrating.");

        const expr = normalizeIntegrationInput(rawInput, variable);

        let result = "";

        // Custom solver aur known non-elementary crash-prevention check
        const specialSolved = handleSpecialIntegrals(expr, variable);

        if (specialSolved) {
            result = nerdamer(specialSolved).text();
        } else {
            // Anti-freeze execution: evaluate through Nerdamer
            const antiderivative = nerdamer.integrate(expr, variable);
            result = antiderivative.text();
        }

        if (!result || result === "undefined" || result === "NaN" || result === expr) {
            throw new Error("Symbolic integration engine is function ka closed-form elementary solution nahi nikal saka. Please use Numerical Integration.");
        }

        // Indefinite integration
        if (type !== "definite") {
            output.textContent = formatOutput(result) + " + C";
            return;
        }

        // Definite integration
        const lowerElement = document.getElementById("lowerLimit");
        const upperElement = document.getElementById("upperLimit");

        if (!lowerElement || !upperElement || lowerElement.value.trim() === "" || upperElement.value.trim() === "") {
            throw new Error("Dono numerical limits daalein.");
        }

        const lower = Number(lowerElement.value);
        const upper = Number(upperElement.value);

        if (!Number.isFinite(lower) || !Number.isFinite(upper)) {
            throw new Error("Valid limits enter karein.");
        }

        if (lower === upper) {
            output.textContent = "Result: 0";
            return;
        }

        const upperValue = evaluateAntiderivative(result, variable, upper);
        const lowerValue = evaluateAntiderivative(result, variable, lower);

        if (Number.isFinite(upperValue) && Number.isFinite(lowerValue)) {
            output.textContent = "Result: " + formatNumber(upperValue - lowerValue);
            return;
        }

        const upperExpression = nerdamer(result).evaluate({ [variable]: upper }).toString();
        const lowerExpression = nerdamer(result).evaluate({ [variable]: lower }).toString();
        const symbolicResult = nerdamer("(" + upperExpression + ")-(" + lowerExpression + ")").toString();

        output.textContent = "Result: " + formatOutput(symbolicResult);

    } catch (error) {
        if (output) {
            output.textContent = "Integration Note:\n\n" + error.message;
        }
        console.warn("Integration handled:", error.message);
    }
}

/* =========================================================
   EVALUATE AN ANTIDERIVATIVE
   ========================================================= */

function evaluateAntiderivative(antiderivative, variable, value) {
    try {
        const evaluated = nerdamer(antiderivative).evaluate({
            [variable]: value
        });

        const numeric = Number(evaluated.text("decimals", 14));
        return Number.isFinite(numeric) ? numeric : NaN;
    } catch (error) {
        return NaN;
    }
}

/* =========================================================
   FORMAT NUMERICAL RESULTS
   ========================================================= */

function formatNumber(value) {
    if (!Number.isFinite(value)) return String(value);
    if (Math.abs(value) < 1e-12) return "0";
    return Number(value.toPrecision(12)).toString();
}

/* =========================================================
   4. NUMERICAL INTEGRATION — COMPOSITE SIMPSON'S RULE
   ========================================================= */

function numericalIntegration() {
    const output = document.getElementById("integrationResult");

    try {
        if (typeof math === "undefined") {
            throw new Error("Math.js load nahi hua.");
        }

        const rawInput = document.getElementById("integrand").value;
        const variable = document.getElementById("integrationVariable").value.trim().toLowerCase();
        const expr = normalizeIntegrationInput(rawInput, variable);

        const lower = Number(document.getElementById("lowerLimit").value);
        const upper = Number(document.getElementById("upperLimit").value);

        if (!Number.isFinite(lower) || !Number.isFinite(upper)) {
            throw new Error("Definite limits daalna zaroori hai (e.g. 1 se 2).");
        }

        if (lower === upper) {
            output.textContent = "Numerical integration\n\nResult: 0";
            return;
        }

        const compiled = math.compile(expr);

        function f(x) {
            const scope = {};
            scope[variable] = x;
            const result = compiled.evaluate(scope);
            const value = typeof result === "number" ? result : Number(result);

            if (!Number.isFinite(value)) {
                throw new Error("Function will become  undefined ya non-finite x = " + x + " near about this.");
            }
            return value;
        }

        const n = 20000; // Must be even
        const h = (upper - lower) / n;
        let sum = f(lower) + f(upper);

        for (let i = 1; i < n; i++) {
            const x = lower + i * h;
            sum += (i % 2 === 0 ? 2 : 4) * f(x);
        }

        const result = (sum * h) / 3;

        output.textContent =
            "Numerical Integration — Simpson's Rule\n\n" +
            "Function: " + rawInput + "\n\n" +
            "Normalized: " + expr + "\n\n" +
            "Limits: [" + lower + ", " + upper + "]\n\n" +
            "Approximate Result: " + formatNumber(result) + "\n\n" +
            "Intervals (n): " + n;
    } catch (error) {
        output.textContent = "Numerical integration error:\n\n" + error.message;
    }
}

/* =========================================================
   5. LIMIT VISIBILITY & EVENT ATTACHMENTS
   ========================================================= */

function toggleLimits() {
    const typeSelect = document.getElementById("integrationType");
    const limits = document.getElementById("integrationLimits");

    if (limits && typeSelect) {
        limits.style.display = typeSelect.value === "definite" ? "block" : "none";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    toggleLimits();

    const typeSelect = document.getElementById("integrationType");
    if (typeSelect) {
        typeSelect.addEventListener("change", toggleLimits);
    }

    const integrateBtn = document.getElementById("integrateBtn");
    if (integrateBtn) integrateBtn.addEventListener("click", integrateFunction);

    const numIntegrateBtn = document.getElementById("numIntegrateBtn");
    if (numIntegrateBtn) numIntegrateBtn.addEventListener("click", numericalIntegration);
});