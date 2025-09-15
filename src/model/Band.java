package model;

public class Band {
    private int bandId;
    private int deviceId;
    private int year;
    private int month;
    private int day;
    private int hourBlock;
    private int posX;
    private int posY;
    private int width;
    private int height;
    private String fontColor;
    private String backColor;
    private String borderStyle;
    private String text;

    public int getBandId() { return bandId; }
    public void setBandId(int bandId) { this.bandId = bandId; }
    public int getDeviceId() { return deviceId; }
    public void setDeviceId(int deviceId) { this.deviceId = deviceId; }
    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }
    public int getMonth() { return month; }
    public void setMonth(int month) { this.month = month; }
    public int getDay() { return day; }
    public void setDay(int day) { this.day = day; }
    public int getHourBlock() { return hourBlock; }
    public void setHourBlock(int hourBlock) { this.hourBlock = hourBlock; }
    public int getPosX() { return posX; }
    public void setPosX(int posX) { this.posX = posX; }
    public int getPosY() { return posY; }
    public void setPosY(int posY) { this.posY = posY; }
    public int getWidth() { return width; }
    public void setWidth(int width) { this.width = width; }
    public int getHeight() { return height; }
    public void setHeight(int height) { this.height = height; }
    public String getFontColor() { return fontColor; }
    public void setFontColor(String fontColor) { this.fontColor = fontColor; }
    public String getBackColor() { return backColor; }
    public void setBackColor(String backColor) { this.backColor = backColor; }
    public String getBorderStyle() { return borderStyle; }
    public void setBorderStyle(String borderStyle) { this.borderStyle = borderStyle; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
}
