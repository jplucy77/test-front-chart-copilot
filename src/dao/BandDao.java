package dao;

import java.sql.*;
import java.util.*;
import model.Band;

public class BandDao {
    private Connection conn;
    public BandDao(Connection conn) { this.conn = conn; }

    public List<Band> findByDeviceAndDate(int deviceId, int year, int month) throws SQLException {
        List<Band> list = new ArrayList<Band>();
        String sql = "SELECT * FROM band WHERE device_id=? AND year=? AND month=?";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setInt(1, deviceId);
        ps.setInt(2, year);
        ps.setInt(3, month);
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            Band b = new Band();
            b.setBandId(rs.getInt("band_id"));
            b.setDeviceId(rs.getInt("device_id"));
            b.setYear(rs.getInt("year"));
            b.setMonth(rs.getInt("month"));
            b.setDay(rs.getInt("day"));
            b.setHourBlock(rs.getInt("hour_block"));
            b.setPosX(rs.getInt("pos_x"));
            b.setPosY(rs.getInt("pos_y"));
            b.setWidth(rs.getInt("width"));
            b.setHeight(rs.getInt("height"));
            b.setFontColor(rs.getString("font_color"));
            b.setBackColor(rs.getString("back_color"));
            b.setBorderStyle(rs.getString("border_style"));
            b.setText(rs.getString("text"));
            list.add(b);
        }
        rs.close();
        ps.close();
        return list;
    }

    public void save(Band band) throws SQLException {
        String sql = "INSERT INTO band (device_id, year, month, day, hour_block, pos_x, pos_y, width, height, font_color, back_color, border_style, text) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setInt(1, band.getDeviceId());
        ps.setInt(2, band.getYear());
        ps.setInt(3, band.getMonth());
        ps.setInt(4, band.getDay());
        ps.setInt(5, band.getHourBlock());
        ps.setInt(6, band.getPosX());
        ps.setInt(7, band.getPosY());
        ps.setInt(8, band.getWidth());
        ps.setInt(9, band.getHeight());
        ps.setString(10, band.getFontColor());
        ps.setString(11, band.getBackColor());
        ps.setString(12, band.getBorderStyle());
        ps.setString(13, band.getText());
        ps.executeUpdate();
        ps.close();
    }
}
