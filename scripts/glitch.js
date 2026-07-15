const glitchChars = [
    "̷","̸","̴","̶","͓","͔","͕","͖","͗","͘",
    "̽","̊","̍","̐","̑","̒","̓","̔","̽",
    "͛","ͣ","ͤ","ͥ","ͦ","ͧ","ͨ","ͩ","ͪ",
    "ͫ","ͬ","ͭ","ͮ","ͯ"
];
function corruptText(original) {
    let output = "";
    for (let i = 0; i < original.length; i++) {
        // 70% chance to corrupt the character
        if (Math.random() < 0.7) {
            output += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
            output += original[i];
        }
    }
    return output;
}
function dataLoss(original) {
    let output = "";
    for (let i = 0; i < original.length; i++) {
        // 50% chance to delete the character
        if (Math.random() < 0.5) {
            output += " ";
        } else {
            output += original[i];
        }
    }
    return output;
}
function corruptHybrid(original) {
    let output = "";
    for (let i = 0; i < original.length; i++) {

        const r = Math.random();

        if (r < 0.4) {
            // 40% chance: data loss
            output += " ";
        } else if (r < 0.85) {
            // 45% chance: glitch replacement
            output += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
            // 15% chance: keep original
            output += original[i];
        }
    }
    return output;
}