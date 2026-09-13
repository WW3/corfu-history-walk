// Deploy-time configuration. The placeholder below is replaced by the GitHub
// Actions workflow (.github/workflows/deploy-pages.yml) with the value of the
// GOOGLE_MAPS_API_KEY repository secret. Never commit a real key here.
window.CORFU_CONFIG = {
  googleMapsApiKey: "__GOOGLE_MAPS_API_KEY__",
};
