<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Kedheon Fanlink Pi Test</title>
    <script src="https://sdk.minepi.com/pi-sdk.js"></script>
    <script>
        // Pi SDK 초기화 (Testnet 모드)
        Pi.init({ version: "2.0", sandbox: true }); 

        function startPiPayment() {
            // Pi 결제 요청 함수
            Pi.createPayment({
                amount: 0.001, // 테스트 금액 (아주 적은 양)
                memo: "10단계 최종 테스트",
                metadata: { orderId: "TEST-0001" } 
            }, {
                onReadyForServerApproval: function(paymentId) {
                    // 서버 승인 대기 (테스트 목적이므로 이 부분은 단순 로깅)
                    console.log("Payment Ready: " + paymentId);
                    alert("결제 승인 대기 중입니다. 이 창을 닫으면 테스트가 완료됩니다.");
                },
                onReadyForServerCompletion: function(paymentId, txid) {
                    // 결제 완료 (테스트 목적이므로 이 부분은 단순 로깅)
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

        // 사용자 인증 요청 함수 (결제 전 사용자 인증이 필요)
        function authenticateUser() {
             Pi.authenticate(["username"], function(auth) {
                document.getElementById("status").innerText = "Pi 사용자: " + auth.user.username + "로 로그인됨.";
                document.getElementById("payButton").disabled = false;
             }).catch(function(error) {
                document.getElementById("status").innerText = "Pi 인증 실패: " + error.message;
             });
        }

        // 페이지 로드 시 사용자 인증 시도
        window.onload = authenticateUser;

    </script>
</head>
<body>
    <div style="text-align: center; margin-top: 100px;">
        <h1>Kedheon Fanlink 10단계 최종 테스트</h1>
        <p id="status" style="color: red;">Pi 사용자 인증 중...</p>

        <button 
            id="payButton" 
            onclick="startPiPayment()" 
            style="padding: 15px 30px; font-size: 20px; background-color: #AB5E90; color: white; border: none; border-radius: 8px; cursor: pointer;"
            disabled
        >
            10단계 테스트 결제 (0.001 Test-Pi)
        </button>
        <p style="margin-top: 20px; color: gray;">이 버튼을 클릭하여 테스트 결제를 진행하시면 10단계가 완료됩니다.</p>
    </div>
</body>
</html>
