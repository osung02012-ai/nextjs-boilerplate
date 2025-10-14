'use client';
import Script from 'next/script';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="beforeInteractive" />
      <Script id="pi-init" strategy="afterInteractive">
        {`
          Pi.init({ version: "2.0", sandbox: true });

          function startPiPayment() {
              Pi.createPayment({
                  amount: 0.001,
                  memo: "10단계 최종 테스트",
                  metadata: { orderId: "TEST-0002" }
              }, {
                  onReadyForServerApproval: function(paymentId) {
                      alert("결제 승인 대기 중입니다. 이 창을 닫으면 테스트가 완료됩니다.");
                  },
                  onReadyForServerCompletion: function(paymentId, txid) {
                      alert("결제 완료!");
                  },
                  onCancel: function(paymentId) {
                      alert("결제가 취소되었습니다.");
                  },
                  onError: function(error, payment) {
                      alert("결제 오류 발생: " + error.message);
                  }
              });
          }

          function authenticateUser() {
              Pi.authenticate(["username"], function(auth) {
                  document.getElementById("status").innerText = "Pi 사용자: " + auth.user.username + "로 로그인됨.";
                  document.getElementById("payButton").disabled = false;
              }).catch(function(error) {
                  document.getElementById("status").innerText = "Pi 인증 실패: " + error.message;
              });
          }

          window.onload = authenticateUser;
        `}
      </Script>

      <h1>Kedheon Fanlink 10단계 최종 테스트</h1>
      <p id="status" style={{ color: 'red' }}>Pi 사용자 인증 중...</p>

      <button 
          id="payButton" 
          onClick={() => startPiPayment()}
          style={{ padding: '15px 30px', fontSize: '20px', backgroundColor: '#AB5E90', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          disabled
      >
          10단계 테스트 결제 (0.001 Test-Pi)
      </button>
      <p style={{ marginTop: '20px', color: 'gray' }}>이 버튼을 클릭하여 테스트 결제를 진행하시면 10단계가 완료됩니다.</p>
    </div>
  );
}
