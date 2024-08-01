import axios from "axios"

const downloadPdf = async (commonId, filename) => {
    const url = `${process.env.REACT_APP_URL}/api/v1/courses/${commonId}/pdf`
    let response;
    try{
        response = await axios.get(url, {
            withCredentials:true,
            responseType: 'blob', // Specify blob response type for downloading files
        });
    }catch(err){
        window.alert("Something went wrong while donwloading\n server responded with " + err?.response?.status)
        return;
    }

    const blob = new Blob([response?.data], { type: response?.headers['content-type'] });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob); // Create a temporary URL for the blob
    link.download = filename;
    link.click();

    // Cleanup (optional): Revoke the temporary URL after download
    setTimeout(() => URL.revokeObjectURL(link.href), 10000); // Example with a one-second delay
};

export default downloadPdf