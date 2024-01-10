# cordova-QuaggaJS
cordovaアプリケーション用のQuaggaJSを使用したバーコード読み取りライブラリです。

普通にバーコードをスキャンすればいいだけならサードパーティー製のプラグイン使えばいいのですが、NW-7（CODABAR）に対応したものが存在しないため、QuaggaJSを利用したバーコード読み取りライブラリを作成しました。

しかし、QuaggaJSのLiveStreamではCordovaアプリとの相性が悪いため、カメラ部分はCordovaのプラグインを使用します。

大まかな動きとしては以下の通り
- カメラの映像をCanvasに投影
- Canvasの映像をQuaggaJSに取り込みバーコードの検出


# 準備
## index.html
``` html
<link href="css/quagga-scanner.css" rel="stylesheet">
<script src="js/quagga.min.js"></script>
<script src="js/quagga_scanner.js"></script>
<body …
<!--バーコードスキャナーカメラエリア-->
    <div id="scanner" class="scanner">
      <!--カメラ映像投影用 Canvas-->
      <canvas id="scanner-canvas"></canvas>
      <!--バーコードガイド-->
      <div id="scanner-guide" class="guide"></div>
      <!--停止ボタン-->
      <button id="scanner-stop">カメラを停止</button>
    </div>
</body>
```
## プラグインのインストール
```
com.virtuoworks.cordova-plugin-canvascamera
```

# 使い方
`quaggaScanner.scan(callback , codeformat)`:
- callback:バーコードスキャン完了後に実行されるコールバック処理を記述します。
- codeformat(optional):スキャンするバーコードのフォーマットを指定します。指定しない場合はEANになります。

``` JavaScript
quaggaScanner.scan(
  function (result) {
    var code = result.codeResult.code;
    //...任意のロジック
  );
);
```
