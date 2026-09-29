# Translation API Notes

This project is currently using the DeepL API for language translation services.

DeepL is the active translation provider for this application, and it is being used to translate content into different languages for the website. The current implementation and configuration are built around DeepL, making it the present source of translation functionality.

## Future Migration to Google Translation API

At some point in the future, if the ministry or the developer is able to obtain a credit card or debit card, the project should migrate from DeepL to the Google Translation API.

This migration is recommended because Google Translation API can provide a more scalable and widely supported translation solution, especially when the project needs broader integration with Google Cloud services and long-term service availability.

## Recommended direction

- Keep DeepL as the current translation provider while the project is running.
- Prepare for a future transition to Google Translation API once billing is available.
- Update the translation service, environment variables, and API calls when the migration is approved.
- Validate translations after migration to confirm quality and compatibility across all supported languages.

## Summary

For now, the project is using DeepL API for translation. However, once the ministry or the developer has access to a credit card or debit card for Google Cloud billing, the application should transition from DeepL to Google Translation API to ensure long-term sustainability and easier expansion.
