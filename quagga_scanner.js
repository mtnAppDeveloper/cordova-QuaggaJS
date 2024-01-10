quaggaScanner = {
    scan: function (callback = null, codeformat = []) {


        //バーコードのフォーマット設定
        if (codeformat.length == 0) {
            codeformat = "ean_reader";
        }

        //スキャンエリアを表示
        $("#scanner").show();
        //Canvasエリアの初期化
        window.plugin.CanvasCamera.initialize({
            fullsize: document.querySelector("#scanner-canvas"),
        });
        //カメラオプション
        const options = {
            width: 352,
            height: 288,
            canvas: {
                width: 352,
                height: 288
            },
            // dataやfileなどが指定できます
            use: "data",
            // FPS
            fps: 30,
            // フラッシュを使う場合は true
            flashMode: false, // または true
            // サムネイルがある場合は true
            hasThumbnail: false,
            // サムネイルの大きさを指定
            // thumbnailRatio: 1 / 6,
            // 利用するカメラの場所
            cameraFacing: 'back', // または front
        };

        //カメラ停止ボタンのイベント登録
        //カメラ停止処理
        $("#scanner-stop").on('click', function () {
            window.plugin.CanvasCamera.stop((e) => { }, () => {
                //スキャナーエリアを非表示
                $("#scanner").css('display', 'none');
            });

        });

        var frameCount = 0; // フレームのカウンタ

        //カメラ起動
        window.plugin.CanvasCamera.start(options,
            function (e) {
                //エラー時
                console.log(e)
            },
            function () {
                //初回のみキーボードを閉じる処理を実行
                if (frameCount === 1) {
                    //キーボードを閉じる
                    if (Keyboard.isVisible) {
                        Keyboard.hide();
                    }
                }
                //ここのコールバック部は映像が更新される度（30FPS）呼び出されるためフレームの変更が10回ごとに実行するようにする
                // フレームが60回ごとに処理を実行
                if (frameCount % 10 === 0) {
                    //canvasを取得
                    var canvas = document.getElementById('scanner-canvas');

                    //canvasをbase64に変換する
                    var base64Data = canvas.toDataURL('image/jpeg');


                    //読み取り開始
                    Quagga.decodeSingle({
                        decoder: {
                            readers: [codeformat],
                        },
                        src: base64Data
                    },
                        function (result) {
                            if (result) {
                                //読み取り時
                                if (result.length == 0) {
                                    return false;
                                }
                                console.log("result", result['codeResult']['code']);
                                //カメラ停止
                                window.plugin.CanvasCamera.stop((e) => { }, () => {
                                    //スキャナーエリアを非表示
                                    $("#scanner").css('display', 'none');
                                });
                                //コールバック処理実行
                                callback(result);
                            } else {
                                //エラー時
                                console.log("not detected");
                            }
                        });

                }
                frameCount++; // フレームカウンタをインクリメント

            });
    }
}