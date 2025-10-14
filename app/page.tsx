'use client'; 

import Script from 'next/script';

// **수정 사항 1: window 객체에 함수 등록**
declare global {
    interface Window {
        startPiPayment: () => void;
        authenticateUser: () => void;
    }
}

export default function Home() {
    // **수정 사항 2: Script 태그 내부의 함수를 window 객체에 할당**
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
                },
                onCancel: function(paymentId) {
                    alert("결제가 취소되었습니다.");
                },
                onError: function(error, payment) {
                    alert("결제 오류 발생: " + error.message);
                }
            });
        };

        window.authenticateUser = function() {
            Pi.authenticate(["username"], function(auth) {
                document.getElementById("status").innerText = "Pi 사용자: " + auth.user.username + "로 로그인됨.";
                document.getElementById("payButton").disabled = false;
            }).catch(function(error) {
                document.getElementById("status").innerText = "Pi 인증 실패: " + error.message;
            });
        };

        window.onload = window.authenticateUser;
    `;
    
    // **수정 사항 3: onClick 핸들러 변경**
    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="beforeInteractive" />
            <Script id="pi-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: piScript }} /> 

            <h1>Kedheon Fanlink 10단계 최종 테스트</h1>
            <p id="status" style={{ color: 'red' }}>Pi 사용자 인증 중...</p>

            <button
                id="payButton"
                onClick={() => window.startPiPayment()} // **window.startPiPayment()로 변경**
                style={{ padding: '15px 30px', fontSize: '20px', backgroundColor: '#AB5E90', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                disabled
            >
                10단계 테스트 결제 (0.001 Test-Pi)
            </button>
            <p style={{ marginTop: '20px', color: 'gray' }}>이 버튼을 클릭하여 테스트 결제를 진행하시면 10단계가 완료됩니다.</p>
        </div>
    );
}
