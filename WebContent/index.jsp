<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.List" import="model.Device" %>
<!DOCTYPE html>
<html>
<head>
    <title>タイムテーブル管理</title>
    <link rel="stylesheet" href="css/jquery-ui.min.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/jquery-1.12.4.min.js"></script>
    <script src="js/jquery-ui.min.js"></script>
    <script src="js/main.js"></script>
</head>
<body>
    <h1>タイムテーブル管理</h1>
    <script type="text/javascript">
    // JSPからdevicesをJavaScriptへ渡す
    var devices = [
    <% 
    java.util.List devList = (java.util.List)request.getAttribute("devices");
    if (devList != null) {
        for (int i = 0; i < devList.size(); i++) {
            model.Device dev = (model.Device)devList.get(i);
            String name = dev.getDeviceName().replace("'", "\\'");
            String detail = dev.getDeviceDetail().replace("'", "\\'");
            out.print("{ deviceId: " + dev.getDeviceId() + ", deviceName: '" + name + "', deviceDetail: '" + detail + "' }");
            if (i < devList.size() - 1) out.print(",\n");
        }
    }
    %>
    ];
    </script>
    <div id="table-container">
        <!-- タイムテーブル表示領域 -->
    </div>
    <div id="modal-template" style="display:none;">
        <!-- モーダル内容はjsで生成 -->
    </div>
</body>
</html>
