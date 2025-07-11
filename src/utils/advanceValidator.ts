import jsonata from "jsonata";

export async function advanceValidator(paylaod :string, expression: string): Promise<boolean> {
    try {
        const parsedPayload = JSON.parse(paylaod);
        const result = await jsonata(expression).evaluate(parsedPayload);
        console.log("JSONata evaluation result:", result);
        if(result === undefined || result === null) {
            console.warn("JSONata evaluation returned undefined or null");
            return false; // Return false if the result is not defined
        }
        return result === true; // Assuming the expression evaluates to a boolean
    } catch (error) {
        console.error("JSONata evaluation error:", error);
        return false; // Return false if there's an error in evaluation
    }
}