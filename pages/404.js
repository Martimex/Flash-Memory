import ErrorTemplate from "../src/components/error_template";

export default function Custom404() {

    const error_message = 'Page Not Found';
    const error_description = `Sorry, the requested page is not available under this link. Most likely there is a typo or some parts of the URL are incorrect. 
        Please make sure to check the link again or click the button below to go back to the landing page.
    `;

    return(
        <ErrorTemplate errNo={404} errMessage={error_message} errDesc={error_description} />
    );
}