import AuthControlsClient from "./AuthControlsClient";

export default function AuthControls() {
  return <AuthControlsClient fallback={<span>Loading auth...</span>} />;
}
