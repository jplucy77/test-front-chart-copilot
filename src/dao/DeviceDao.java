package dao;

import java.sql.*;
import java.util.*;
import model.Device;

public class DeviceDao {
    private Connection conn;
    public DeviceDao(Connection conn) { this.conn = conn; }

    public List<Device> findAll() throws SQLException {
        List<Device> list = new ArrayList<Device>();
        String sql = "SELECT device_id, device_name, device_detail FROM device";
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        while (rs.next()) {
            Device d = new Device();
            d.setDeviceId(rs.getInt("device_id"));
            d.setDeviceName(rs.getString("device_name"));
            d.setDeviceDetail(rs.getString("device_detail"));
            list.add(d);
        }
        rs.close();
        stmt.close();
        return list;
    }
}
