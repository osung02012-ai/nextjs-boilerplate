<script src="https://sdk.minepi.com/v2/sdk.js"></script>
<script>
    // Pi SDK 초기화 (Testnet 모드)
    Pi.init({ version: "2.0", sandbox: true });

    // 결제 요청 함수
    function makePiPayment() {
        const paymentData = {
            amount: 1, // 테스트 결제 금액은 1 Test-Pi
            memo: "Kedheon Fanlink 10단계 최종 테스트", // 메모
            metadata: { app_name: "Kedheon Fanlink" } // 앱 이름 메타데이터
        };

        const onPaymentCompleted = (payment) => {
            alert("✅ 10단계 결제 성공! Checklist로 돌아가 완료 확인.");
            // 이 시점에서 Pi Checklist 10단계가 Completed로 변경되어야 합니다.
        };

        const onPaymentCancelled = (payment) => {
            alert("❌ 결제 취소됨. 다시 시도하십시오.");
        };

        const onPaymentError = (error) => {
            alert("⚠️ 결제 오류 발생: " + error.message);
        };

        Pi.requestPayment(paymentData, onPaymentCompleted, onPaymentCancelled, onPaymentError);
    }
</script>

<div style="text-align: center; padding: 50px; font-family: sans-serif;">
    <h1>Kedheon Fanlink 10단계 최종 테스트</h1>
    <p>Pi 사용자 인증 상태: <span id="authStatus">인증 대기 중...</span></p>
    <button id="paymentButton" onclick="makePiPayment()" style="padding: 15px 30px; font-size: 20px; background-color: #ff5722; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 20px;">
        10단계 테스트 결제
    </button>
</div>

<script>
    // Pi 사용자 인증 상태 확인 및 업데이트
    Pi.authenticate(["username", "payments"], (auth) => {
        const authStatusElement = document.getElementById("authStatus");
        if (auth && auth.user) {
            authStatusElement.textContent = `✅ Pi 사용자: ${auth.user.username} (로그인됨)`;
            document.getElementById("paymentButton").disabled = false;
        } else {
            authStatusElement.textContent = `❌ Pi 사용자 인증 실패. 브라우저를 재시작하십시오.`;
            document.getElementById("paymentButton").disabled = true;
        }
    });

    // 버튼 초기 상태 비활성화
    document.getElementById("paymentButton").disabled = true;
</script>
