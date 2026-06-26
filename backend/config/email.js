// Mock Email Service for testing and local environment
export async function sendPasswordResetOTPEmail(email, name, otp) {
  console.log(`✉️ [Mock Email] Password Reset OTP sent to ${email} (${name}): OTP is ${otp}`);
  return true;
}

export async function sendPasswordChangedEmail(email, name) {
  console.log(`✉️ [Mock Email] Password Changed alert sent to ${email} (${name})`);
  return true;
}

export async function sendWelcomeEmail(email, name) {
  console.log(`✉️ [Mock Email] Welcome email sent to ${email} (${name})`);
  return true;
}

export async function sendLoginAlertEmail(email, name, ip, userAgent) {
  console.log(`✉️ [Mock Email] Login Alert sent to ${email} (${name}) from IP ${ip}`);
  return true;
}

export async function sendVerificationOTPEmail(email, name, otp) {
  console.log(`✉️ [Mock Email] Verification OTP sent to ${email} (${name}): OTP is ${otp}`);
  return true;
}
