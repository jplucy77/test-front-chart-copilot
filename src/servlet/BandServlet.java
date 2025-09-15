package servlet;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;
import java.util.*;
import dao.BandDao;
import model.Band;

public class BandServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Connection conn = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/testdb", "user", "password");
            BandDao dao = new BandDao(conn);
            int deviceId = Integer.parseInt(request.getParameter("deviceId"));
            int year = Integer.parseInt(request.getParameter("year"));
            int month = Integer.parseInt(request.getParameter("month"));
            List<Band> bands = dao.findByDeviceAndDate(deviceId, year, month);
            request.setAttribute("bands", bands);
            RequestDispatcher rd = request.getRequestDispatcher("/index.jsp");
            rd.forward(request, response);
        } catch (Exception e) {
            throw new ServletException(e);
        } finally {
            try { if (conn != null) conn.close(); } catch (Exception ignore) {}
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Connection conn = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/testdb", "user", "password");
            BandDao dao = new BandDao(conn);
            Band band = new Band();
            band.setDeviceId(Integer.parseInt(request.getParameter("deviceId")));
            band.setYear(Integer.parseInt(request.getParameter("year")));
            band.setMonth(Integer.parseInt(request.getParameter("month")));
            band.setDay(Integer.parseInt(request.getParameter("day")));
            band.setHourBlock(Integer.parseInt(request.getParameter("hourBlock")));
            band.setPosX(Integer.parseInt(request.getParameter("posX")));
            band.setPosY(Integer.parseInt(request.getParameter("posY")));
            band.setWidth(Integer.parseInt(request.getParameter("width")));
            band.setHeight(Integer.parseInt(request.getParameter("height")));
            band.setFontColor(request.getParameter("fontColor"));
            band.setBackColor(request.getParameter("backColor"));
            band.setBorderStyle(request.getParameter("borderStyle"));
            band.setText(request.getParameter("text"));
            dao.save(band);
            response.setStatus(HttpServletResponse.SC_OK);
        } catch (Exception e) {
            throw new ServletException(e);
        } finally {
            try { if (conn != null) conn.close(); } catch (Exception ignore) {}
        }
    }
}
