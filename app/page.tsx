'use client'; // 클라이언트 컴포넌트 선언

import Script from 'next/script';
import { useEffect, useState } from 'react';

// Pi SDK 초기화 및 결제 로직 함수 (컴포넌트 외부에 정의)
function startPiPayment() {
    if (typeof window.Pi === 'undefined') {
        alert("Pi SDK가 로드되지 않았습니다. 잠시 후 다시 시도해 주세요.");
        return;
    }

    Pi.createPayment({
        amount: 0.001,
        memo: "10단계 최종 테스트",
        metadata: { orderId: "TEST-0003" }
    }, {
        onReadyForServerApproval: function(paymentId) {
            console.log("Payment Ready: " + paymentId);
            alert("결제 승인 대기 중입니다. 이 창을 닫으면 테스트가 완료됩니다.");
        },
        onReadyForServerCompletion: function(paymentId, txid) {
            console.log("Payment Completed: " + paymentId + ", TXID: " + txid);
        },
        onCancel: function(paymentId) {
            alert("결제가 취소되었습니다.");
        },
        onError: function(error, payment) {
            alert("결제 오류 발생: " + error.message);
        }
    });
}

// 사용자 인증 로직 (컴포넌트 내부에 정의)
export default function Home() {
  const [status, setStatus] = useState("Pi 사용자 인증 중...");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (typeof window.Pi !== 'undefined') {
      window.Pi.authenticate(["username"])
        .then(function(auth) {
          setStatus("✅ Pi 사용자: " + auth.user.username + "로 로그인됨.");
          setButtonDisabled(false);
        })
        .catch(function(error) {
          setStatus("❌ Pi 인증 실패: " + error.message);
          setButtonDisabled(true);
        });
    } else {
      setStatus("Pi SDK 로드 대기 중...");
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <Script 
          src="https://sdk.minepi.com/pi-sdk.js" 
          strategy="beforeInteractive" 
      />

      <h1>Kedheon Fanlink 10단계 최종 테스트</h1>
      <p id="status" style={{ color: buttonDisabled ? 'red' : 'green' }}>{status}</p>

      <button 
          id="payButton" 
          onClick={startPiPayment}
          style={{ 
              padding: '15px 30px', 
              fontSize: '20px', 
              backgroundColor: '#AB5E90', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: buttonDisabled ? 'not-allowed' : 'pointer' 
          }}
          disabled={buttonDisabled}
      >
          10단계 테스트 결제 (0.001 Test-Pi)
      </button>
      <p style={{ marginTop: '20px', color: 'gray' }}>이 버튼을 클릭하여 테스트 결제를 진행하시면 10단계가 완료됩니다.</p>
    </div>
  );
}
