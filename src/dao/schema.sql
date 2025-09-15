-- 装置情報テーブル
CREATE TABLE device (
    device_id INT PRIMARY KEY AUTO_INCREMENT,
    device_name VARCHAR(100) NOT NULL,
    device_detail VARCHAR(255)
);

-- 帯情報テーブル
CREATE TABLE band (
    band_id INT PRIMARY KEY AUTO_INCREMENT,
    device_id INT NOT NULL,
    year INT NOT NULL,
    month INT NOT NULL,
    day INT NOT NULL,
    hour_block INT NOT NULL, -- 0~7 (3時間単位)
    pos_x INT NOT NULL,
    pos_y INT NOT NULL,
    width INT NOT NULL,
    height INT NOT NULL,
    font_color VARCHAR(20),
    back_color VARCHAR(20),
    border_style VARCHAR(20),
    text VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (device_id) REFERENCES device(device_id)
);
