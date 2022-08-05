var SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;
// Configure API key authorization: api-key
var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = "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";
module.exports = {

    sendTestEmail: async(address) => {
        var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
        sendSmtpEmail = {
            sender: { email: "vivekvsms@gmail.com" },
            to: [
            {
                email: "viveksmsji@gmail.com",
                name: "Vivek Singh",
            },
            ],
            subject: "Test sender blue Email",
            textContent: "Test Email sender blue Content",
        };
        apiInstance.sendTransacEmail(sendSmtpEmail).then(
            function (data) {
            console.log("API called successfully. Returned data: " + data);
            },
            function (error) {
            console.error(error);
            }
        );
    }
} 

