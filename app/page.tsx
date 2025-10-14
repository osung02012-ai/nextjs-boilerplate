

'use client'; 

import Script from 'next/script';

// **수정 사항 1: window 객체 타입 선언 (동일)**
declare global {
    interface Window {
        startPiPayment: () => void;
        authenticateUser: () => void;
    }
}

export default function Home() {
    
    const piScript = `
        Pi.init({ version: "2.0", sandbox: true });

        window.startPiPayment = function() {
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
                    // **결제 성공 시 최종적으로 10단계가 완료됩니다.**
                },
                onCancel: function(paymentId) {
                    alert("결제가 취소되었습니다.");
                },
                onError: function(error, payment) {
                    alert("결제 오류 발생: " + error.message + "\\n버튼이 활성화되지 않았다면 이 창을 닫고 다시 시도하세요.");
                }
            });
        };

        window.authenticateUser = function() {
            Pi.authenticate(["username"], function(auth) {
                // **인증 성공 시:**
                document.getElementById("status").innerText = "Pi 사용자: " + auth.user.username + "로 로그인됨.";
                document.getElementById("payButton").disabled = false;
            }).catch(function(error) {
                // **인증 실패 시 (강제 활성화):**
                document.getElementById("status").innerText = "Pi 인증 실패 (결제 테스트 강제 활성화): " + error.message;
                document.getElementById("payButton").disabled = false; // **<<-- 이 부분을 추가/확인합니다.**
            });
        };

        window.onload = window.authenticateUser;
    `;
    
    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="beforeInteractive" />
            <Script id="pi-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: piScript }} /> 

            <h1>Kedheon Fanlink 10단계 최종 테스트</h1>
            <p id="status" style={{ color: 'red' }}>Pi 사용자 인증 중...</p>

            <button
                id="payButton"
                onClick={() => window.startPiPayment()}
                style={{ padding: '15px 30px', fontSize: '20px', backgroundColor: '#AB5E90', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                disabled
            >
                10단계 테스트 결제 (0.001 Test-Pi)
            </button>
            <p style={{ marginTop: '20px', color: 'gray' }}>이 버튼을 클릭하여 테스트 결제를 진행하시면 10단계가 완료됩니다.</p>
        </div>
    );
}
