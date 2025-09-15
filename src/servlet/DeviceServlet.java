package servlet;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;
import java.util.*;
import dao.DeviceDao;
import model.Device;

public class DeviceServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Connection conn = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/testdb", "user", "password");
            DeviceDao dao = new DeviceDao(conn);
            List<Device> devices = dao.findAll();
            request.setAttribute("devices", devices);
            RequestDispatcher rd = request.getRequestDispatcher("/index.jsp");
            rd.forward(request, response);
        } catch (Exception e) {
            throw new ServletException(e);
        } finally {
            try { if (conn != null) conn.close(); } catch (Exception ignore) {}
        }
    }
}
