import plugin from "../../index.js";

export default {
    plugins: { qunit: plugin },
    rules: plugin.configs.recommended.rules,
};
