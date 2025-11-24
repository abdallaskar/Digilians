// Function to generate and download DOCX report
import api from "./axiosConfig";

/**
 * Downloads the weekly report as a DOCX file.
 * @param {number} weekNumber The week number to fetch.
 * @param {number} year The year to fetch.
 */
export const DocxReport = async (weekNumber, year) => {
    // Basic validation
    if (!weekNumber || !year) {
        console.error("Week number and year are required for the report.");
        alert("Please specify the week and year for the report.");
        return;
    }

    try {
        // 1. Call the API with responseType set to 'blob'
        const response = await api.get(`/docx/export`, {
            params: { week: weekNumber, year: year },
            responseType: 'blob', // Crucial for handling binary data (files)
        });

        // Check if the response is actually JSON (error) despite 200 OK
        const contentType = response.headers['content-type'];
        if (contentType && contentType.includes('application/json')) {
            const text = await (new Response(response.data)).text();
            try {
                const json = JSON.parse(text);
                throw new Error(json.message || 'Server returned an error');
            } catch (e) {
                throw new Error('Server returned an error');
            }
        }

        // 2. Extract filename from headers (optional but good practice)
        // The backend sets the filename in the 'Content-Disposition' header
        const contentDisposition = response.headers['content-disposition'];
        let filename = `weekly_report_W${weekNumber}_Y${year}.docx`;

        if (contentDisposition) {
            const match = contentDisposition.match(/filename="?(.+)"?$/);
            if (match) {
                filename = match[1];
            }
        }

        // 3. Create a blob and a temporary URL
        // A Blob represents file-like objects of immutable raw data
        const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });
        const url = window.URL.createObjectURL(blob);

        // 4. Create a temporary <a> tag and click it to trigger download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename); // Set the filename for the download

        document.body.appendChild(link);
        link.click();

        // 5. Clean up the temporary URL and element
        link.remove();
        window.URL.revokeObjectURL(url);

        console.log(`Successfully downloaded ${filename}`);

    } catch (error) {
        console.error('Download failed:', error);
        // Check for error response from the server (e.g., 404 Not Found)
        if (error.response && error.response.data instanceof Blob) {
            // Read the text from the error Blob for user-friendly messaging
            const errorText = await error.response.data.text();
            try {
                const errorJson = JSON.parse(errorText);
                alert(`Error: ${errorJson.message || 'Report could not be generated.'}`);
            } catch (e) {
                alert(error.message || 'An unknown error occurred during download.');
            }
        } else {
            alert(error.message || 'An error occurred during the report download.');
        }
    }
};

export const PDFReport = async (weekNumber, year) => {
    // Basic validation
    if (!weekNumber || !year) {
        console.error("Week number and year are required for the report.");
        alert("Please specify the week and year for the report.");
        return;
    }

    try {
        // 1. Call the API with responseType set to 'blob'
        const response = await api.get(`/pdf/export`, {
            params: { week: weekNumber, year: year },
            responseType: 'blob', // Crucial for handling binary data (files)
        });
        console.log('PDF response received:', response);

        // Check if the response is actually JSON (error) despite 200 OK
        const contentType = response.headers['content-type'];
        if (contentType && contentType.includes('application/json')) {
            const text = await (new Response(response.data)).text();
            try {
                const json = JSON.parse(text);
                throw new Error(json.message || 'Server returned an error');
            } catch (e) {
                throw new Error('Server returned an error');
            }
        }

        // 2. Extract filename from headers (optional but good practice)
        // The backend sets the filename in the 'Content-Disposition' header
        const contentDisposition = response.headers['content-disposition'];
        let filename = `weekly_report_W${weekNumber}_Y${year}.pdf`;

        if (contentDisposition) {
            const match = contentDisposition.match(/filename="?(.+)"?$/);
            if (match) {
                // Decode URI component if the filename is encoded (common for non-ASCII)
                filename = decodeURIComponent(match[1]);
            }
        }

        // 3. Create a blob and a temporary URL
        // A Blob represents file-like objects of immutable raw data
        const blob = new Blob([response.data], {
            // 🚩 CORRECTED: Use the MIME type for PDF documents
            type: 'application/pdf'
        });
        const url = window.URL.createObjectURL(blob);

        // 4. Create a temporary <a> tag and click it to trigger download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename); // Set the filename for the download

        document.body.appendChild(link);
        link.click();

        // 5. Clean up the temporary URL and element
        link.remove();
        window.URL.revokeObjectURL(url);

        console.log(`Successfully downloaded ${filename}`);

    } catch (error) {
        console.error('Download failed:', error);

        // --- Error Handling for Backend Response ---
        if (error.response && error.response.data instanceof Blob) {
            // Read the text from the error Blob (which contains the JSON error message)
            const errorText = await error.response.data.text();
            try {
                // Attempt to parse the server's JSON error response
                const errorJson = JSON.parse(errorText);
                alert(`Error: ${errorJson.message || 'Report could not be generated.'}`);
            } catch (e) {
                // If the error response wasn't clean JSON
                alert(error.message || 'An unknown error occurred during download.');
            }
        } else {
            // Handle network errors (e.g., server offline, CORS)
            alert(error.message || 'A network error occurred during the report download.');
        }
    }
};