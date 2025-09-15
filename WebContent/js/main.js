$(function(){
    // サーバから装置情報取得（仮：サンプルデータ）
    var devices = [
        { deviceId: 1, deviceName: '装置A', deviceDetail: '詳細A' },
        { deviceId: 2, deviceName: '装置B', deviceDetail: '詳細B' }
    ];

    // 日付範囲（現在日付から3ヶ月）
    var today = new Date();
    var months = [];
    for (var i = 0; i < 3; i++) {
        var d = new Date(today.getFullYear(), today.getMonth() + i, 1);
        months.push({ year: d.getFullYear(), month: d.getMonth() + 1 });
    }

    // 各月の日数取得
    function getDays(year, month) {
        return new Date(year, month, 0).getDate();
    }

    // ヘッダー生成
    var thead = '<tr><th rowspan="2">装置名</th><th rowspan="2">装置詳細</th>';
    months.forEach(function(m) {
        var days = getDays(m.year, m.month);
        thead += '<th colspan="' + days + '">' + m.year + '/' + m.month + '</th>';
    });
    thead += '</tr><tr>';
    months.forEach(function(m) {
        var days = getDays(m.year, m.month);
        for (var d = 1; d <= days; d++) {
            thead += '<th>' + d + '</th>';
        }
    });
    thead += '</tr>';

    // 明細（装置ごとに行生成）
    var tbody = '';
    devices.forEach(function(dev) {
        tbody += '<tr>';
        tbody += '<td>' + dev.deviceName + '</td>';
        tbody += '<td>' + dev.deviceDetail + '</td>';
        months.forEach(function(m) {
            var days = getDays(m.year, m.month);
            for (var d = 1; d <= days; d++) {
                tbody += '<td class="tt-day" data-device="' + dev.deviceId + '" data-year="' + m.year + '" data-month="' + m.month + '" data-day="' + d + '">';
                // 8分割（3時間単位）
                for (var h = 0; h < 8; h++) {
                    tbody += '<div class="tt-block" data-hour="' + h + '" style="height:12px;border-bottom:1px solid #eee;position:relative;"></div>';
                }
                tbody += '</td>';
            }
        });
        tbody += '</tr>';
    });

    // テーブル描画
    $('#table-container').html('<table class="table-timetable"><thead>' + thead + '</thead><tbody>' + tbody + '</tbody></table>');

    // テンプレート（10種類）
    var templates = [
        { fontColor: '#fff', backColor: '#2196F3', borderStyle: '2px solid #1976D2' },
        { fontColor: '#fff', backColor: '#4CAF50', borderStyle: '2px solid #388E3C' },
        { fontColor: '#fff', backColor: '#FF9800', borderStyle: '2px solid #F57C00' },
        { fontColor: '#fff', backColor: '#E91E63', borderStyle: '2px solid #C2185B' },
        { fontColor: '#333', backColor: '#FFEB3B', borderStyle: '2px solid #FBC02D' },
        { fontColor: '#333', backColor: '#B2FF59', borderStyle: '2px solid #689F38' },
        { fontColor: '#fff', backColor: '#9C27B0', borderStyle: '2px solid #7B1FA2' },
        { fontColor: '#fff', backColor: '#607D8B', borderStyle: '2px solid #455A64' },
        { fontColor: '#333', backColor: '#F8BBD0', borderStyle: '2px solid #F06292' },
        { fontColor: '#fff', backColor: '#795548', borderStyle: '2px solid #5D4037' }
    ];

    // モーダル生成
    function showModal(targetBlock) {
        var modal = $('<div></div>').attr('id', 'band-modal').css({ padding: '16px' });
        var select = $('<select></select>').attr('id', 'template-select');
        templates.forEach(function(t, i){
            select.append('<option value="'+i+'">テンプレート'+(i+1)+'</option>');
        });
        var input = $('<input type="text" id="band-text" placeholder="テキスト入力" style="width:180px;">');
        var addBtn = $('<button id="band-add" disabled>追加</button>');
        modal.append('<div>テンプレート: </div>').append(select);
        modal.append('<div>テキスト: </div>').append(input);
        modal.append('<br>').append(addBtn);
        $("#modal-template").html(modal).dialog({
            modal: true,
            title: '帯追加',
            width: 300,
            close: function(){ $(this).dialog('destroy').empty(); }
        });
        select.on('change input', checkEnable);
        input.on('input', checkEnable);
        function checkEnable(){
            if(select.val()!=='' && input.val().length>0){ addBtn.prop('disabled', false); }
            else{ addBtn.prop('disabled', true); }
        }
        addBtn.on('click', function(){
            var idx = select.val();
            var txt = input.val();
            var t = templates[idx];
            addBand(targetBlock, t, txt);
            $("#modal-template").dialog('close');
        });
    }

    // 帯追加
    function addBand(targetBlock, template, text){
        var $block = $(targetBlock);
        var $td = $block.closest('td');
        var band = $('<div class="band"></div>')
            .css({
                color: template.fontColor,
                background: template.backColor,
                border: template.borderStyle,
                width: '60px', height: '20px', left: 0, top: 0, position: 'absolute'
            })
            .text(text);
        var closeBtn = $('<button class="band-close">×</button>');
        band.append(closeBtn);
        $block.append(band);
        band.draggable({ containment: $block });
        band.resizable({ containment: $block });
        closeBtn.on('click', function(){ band.remove(); });
    }

    // TD内の3時間ブロッククリックでモーダル表示
    $(document).on('click', '.tt-block', function(e){
        showModal(this);
        e.stopPropagation();
    });

    // 30秒ごとに帯情報保存（Ajax）
    setInterval(function(){
        $('.band').each(function(){
            var $band = $(this);
            var $block = $band.parent();
            var $td = $block.closest('td');
            var deviceId = $td.data('device');
            var year = $td.data('year');
            var month = $td.data('month');
            var day = $td.data('day');
            var hourBlock = $block.data('hour');
            var posX = parseInt($band.css('left')) || 0;
            var posY = parseInt($band.css('top')) || 0;
            var width = $band.width();
            var height = $band.height();
            var fontColor = $band.css('color');
            var backColor = $band.css('background-color');
            var borderStyle = $band.css('border');
            var text = $band.text().replace('×','');
            $.ajax({
                url: 'servlet/BandServlet',
                type: 'POST',
                data: {
                    deviceId: deviceId,
                    year: year,
                    month: month,
                    day: day,
                    hourBlock: hourBlock,
                    posX: posX,
                    posY: posY,
                    width: width,
                    height: height,
                    fontColor: fontColor,
                    backColor: backColor,
                    borderStyle: borderStyle,
                    text: text
                }
            });
        });
    }, 30000);

    // 1分ごとに帯情報取得・再描画（Ajax, CSV形式）
    setInterval(function(){
        $('.band').remove();
        devices.forEach(function(dev){
            months.forEach(function(m){
                $.ajax({
                    url: 'servlet/BandServlet',
                    type: 'GET',
                    data: {
                        deviceId: dev.deviceId,
                        year: m.year,
                        month: m.month
                    },
                    success: function(data){
                        // CSV形式: deviceId,year,month,day,hourBlock,posX,posY,width,height,fontColor,backColor,borderStyle,text\n...
                        if(!data) return;
                        var lines = data.split('\n');
                        lines.forEach(function(line){
                            var band = {};
                            var arr = line.split(',');
                            if(arr.length < 13) return;
                            band.deviceId = arr[0];
                            band.year = arr[1];
                            band.month = arr[2];
                            band.day = arr[3];
                            band.hourBlock = arr[4];
                            band.posX = arr[5];
                            band.posY = arr[6];
                            band.width = arr[7];
                            band.height = arr[8];
                            band.fontColor = arr[9];
                            band.backColor = arr[10];
                            band.borderStyle = arr[11];
                            band.text = arr.slice(12).join(','); // テキストにカンマ含む場合
                            var $td = $('.tt-day[data-device="'+band.deviceId+'"][data-year="'+band.year+'"][data-month="'+band.month+'"][data-day="'+band.day+'"]');
                            var $block = $td.find('.tt-block[data-hour="'+band.hourBlock+'"]');
                            if($block.length){
                                var bandDiv = $('<div class="band"></div>')
                                    .css({
                                        color: band.fontColor,
                                        background: band.backColor,
                                        border: band.borderStyle,
                                        width: band.width + 'px',
                                        height: band.height + 'px',
                                        left: band.posX + 'px',
                                        top: band.posY + 'px',
                                        position: 'absolute'
                                    })
                                    .text(band.text);
                                var closeBtn = $('<button class="band-close">×</button>');
                                bandDiv.append(closeBtn);
                                $block.append(bandDiv);
                                bandDiv.draggable({ containment: $block });
                                bandDiv.resizable({ containment: $block });
                                closeBtn.on('click', function(){ bandDiv.remove(); });
                            }
                        });
                    },
                    dataType: 'text'
                });
            });
        });
    }, 60000);
});
