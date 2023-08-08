import ErrorTemplate from "../src/components/error_template";

export default function Custom500() {

    const error_message = 'Server-side error occurred';
    const error_description = `There has been some unexpected server related issues that caused the error. First of all,
        try to refresh the page or use the button below. If the error still persist, please come back later and try again.
        In case of further issues, please contact me directly via my Github profile.
    `;

    return(
        <ErrorTemplate errNo={500} errMessage={error_message} errDesc={error_description} />
    );
}