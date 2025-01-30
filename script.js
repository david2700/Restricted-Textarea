// JavaScript for Restricted Textarea UI


// Potential Ideas,
// You can add a clear button to the project.


document.addEventListener("DOMContentLoaded", () => {
    

    const textarea = document.getElementById("restricted-textarea");
    const counter = document.getElementById("char-counter");
    const counterWrapper = document.querySelector(".counter-wrapper");

    // Store original colors for reset
    const originalColors = {
        text: "#333",
        border: "#e0e0e0",
        counter: "#666"
    };

    textarea.addEventListener("input", () => {
        const textareaLength = textarea.value.length;
        counter.textContent = textareaLength;  // Changed to count up instead of down

        if (textareaLength >= 200) {
            // At limit
            counterWrapper.style.color = "red";
            textarea.style.color = "red";
            textarea.style.borderColor = "red";
            
            // Prevent further input if exactly at limit
            if (textareaLength > 200) {
                textarea.value = textarea.value.slice(0, 200);
            }
        } else if (textareaLength > 175) {
            // Warning zone
            counterWrapper.style.color = "#ff9900";
            textarea.style.color = originalColors.text;
            textarea.style.borderColor = "#ff9900";
        } else {
            // Normal zone - reset all colors
            counterWrapper.style.color = originalColors.counter;
            textarea.style.color = originalColors.text;
            textarea.style.borderColor = originalColors.border;
        }
    });

    // Add paste event handler to prevent pasting too much text
    textarea.addEventListener("paste", (e) => {
        const pastedText = e.clipboardData.getData("text");
        const currentLength = textarea.value.length;
        
        if (currentLength + pastedText.length > 200) {
            e.preventDefault();
            // Only paste what fits
            const availableSpace = 200 - currentLength;
            const truncatedText = pastedText.slice(0, availableSpace);
            
            // Use setTimeout to insert text after the paste event
            setTimeout(() => {
                textarea.value = textarea.value + truncatedText;
                // Trigger input event to update counter
                textarea.dispatchEvent(new Event("input"));
            }, 0);
        }
    });
});