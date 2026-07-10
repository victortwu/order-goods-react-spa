import "@cloudscape-design/global-styles/index.css";

const TWILIO_NUMBER = "+1 (206) 350-9198";
const CONTACT_EMAIL = "victor607@gmail.com";
const PRIVACY_POLICY_URL = "https://gist.github.com/victortwu/cd8abf4439d78613dc195e6258cad706";
const TERMS_URL = "https://gist.github.com/victortwu/082509f9ea9c7f3725e199ead1bada38";

export const SmsConsentPage = () => (
  <div
    style={{
      maxWidth: 720,
      margin: "0 auto",
      padding: "40px 24px",
      fontFamily: "system-ui, sans-serif",
      lineHeight: 1.6,
      color: "#1a1a1a",
    }}
  >
    <h1 style={{ fontSize: "1.75rem", marginBottom: 8 }}>
      BDK SMS Notifications — Consent &amp; Opt-In
    </h1>
    <p style={{ color: "#555", marginBottom: 32 }}>
      Berliner Döner Kebab (BDK) — Internal Order Status Notifications
    </p>

    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: "1.25rem" }}>What is this program?</h2>
      <p>
        BDK uses SMS notifications to keep employees and authorized personnel informed about the
        status of goods orders placed through our internal ordering system. Messages are strictly
        transactional — they notify you when an order has been placed, completed, requires
        attention, or encounters an error.
      </p>
    </section>

    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: "1.25rem" }}>Who receives messages?</h2>
      <p>
        Only BDK employees, contractors, or ownership who are designated as order administrators.
        This is not a marketing program and is not open to the general public.
      </p>
    </section>

    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: "1.25rem" }}>How do you opt in?</h2>
      <p>
        Authorized personnel are enrolled by a system administrator who adds their phone number to
        the notification configuration. Before enrollment, the employee is informed of the SMS
        program and provides verbal or written consent. Consent is documented internally as part of
        the onboarding or system setup process.
      </p>
      <div
        style={{
          background: "#f0f4f8",
          border: "1px solid #d0d8e0",
          borderRadius: 8,
          padding: 16,
          marginTop: 12,
        }}
      >
        <strong>Consent acknowledgment:</strong>
        <p style={{ margin: "8px 0 0" }}>
          By having your phone number added to BDK SMS notifications, you agree to receive automated
          transactional text messages from <strong>{TWILIO_NUMBER}</strong> regarding order
          statuses. Message frequency varies (typically 1–5 messages per week). Message and data
          rates may apply. You can opt out at any time by replying STOP.
        </p>
      </div>
    </section>

    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: "1.25rem" }}>Message frequency</h2>
      <p>
        Approximately 1–5 messages per week, depending on order volume. Messages are only sent when
        an order event occurs (e.g., order submitted, order completed, error encountered).
      </p>
    </section>

    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: "1.25rem" }}>Sample messages</h2>
      <ul style={{ paddingLeft: 20 }}>
        <li>"The goods order for Restaurant Depot is ready for your approval."</li>
        <li>"The order has been placed with Restaurant Depot — status: success"</li>
        <li>"The order has been placed with Westcoast Pita — status: partial_success"</li>
        <li>"The goods order failed with error. Please check the logs."</li>
      </ul>
    </section>

    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: "1.25rem" }}>How to opt out</h2>
      <p>
        Reply <strong>STOP</strong> to any message from {TWILIO_NUMBER} at any time. You will
        receive a confirmation and will no longer receive SMS notifications. You may also contact a
        system administrator to have your number removed.
      </p>
    </section>

    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: "1.25rem" }}>Help</h2>
      <p>
        Reply <strong>HELP</strong> to any message for support information, or email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </section>

    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: "1.25rem" }}>Message and data rates</h2>
      <p>
        Standard message and data rates may apply based on your mobile carrier plan. BDK does not
        charge for SMS notifications.
      </p>
    </section>

    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: "1.25rem" }}>Privacy &amp; Terms</h2>
      <ul style={{ paddingLeft: 20 }}>
        <li>
          <a href={PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href={TERMS_URL} target="_blank" rel="noopener noreferrer">
            Terms and Conditions
          </a>
        </li>
      </ul>
      <p style={{ marginTop: 8 }}>
        We do not sell, rent, or share your phone number with third parties. Your number is used
        solely for transactional order notifications.
      </p>
    </section>

    <footer
      style={{
        borderTop: "1px solid #e0e0e0",
        paddingTop: 16,
        marginTop: 40,
        fontSize: "0.875rem",
        color: "#777",
      }}
    >
      <p>© {new Date().getFullYear()} Berliner Döner Kebab (BDK). All rights reserved.</p>
      <p>
        Contact: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </footer>
  </div>
);
