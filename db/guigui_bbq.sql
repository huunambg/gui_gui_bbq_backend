-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th1 03, 2025 lúc 11:34 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `guigui_bbq`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `buffer`
--

CREATE TABLE `buffer` (
  `buffer_id` int(11) NOT NULL,
  `buffer_type` varchar(100) NOT NULL,
  `price_per_person` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `buffer`
--

INSERT INTO `buffer` (`buffer_id`, `buffer_type`, `price_per_person`) VALUES
(1, 'Buffer Lẩu', 149000),
(2, 'Buffer Nướng', 149000),
(4, 'Buffer Nướng VIP', 149000),
(5, 'Buffer Nướng + Lẩu', 159000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `menu`
--

CREATE TABLE `menu` (
  `menu_id` int(11) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT 1,
  `image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `menu`
--

INSERT INTO `menu` (`menu_id`, `item_name`, `price`, `category`, `is_available`, `image`) VALUES
(1, 'Rượu vang đỏ', 40000, 'Rượu', 1, ''),
(2, 'Nước Lavie', 10000, 'Nước', 1, ''),
(3, 'Buffer Nước', 20000, 'Nước', 1, NULL),
(4, 'Pepsi', 10000, 'Nước', 1, NULL),
(5, 'Pepsi', 10000, 'Nước', 1, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  `total_amount` decimal(10,0) DEFAULT 0,
  `status` enum('Pending','Completed','Cancelled') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`order_id`, `order_date`, `total_amount`, `status`) VALUES
(30, '2025-01-04 17:25:58', 50000, 'Pending'),
(31, '2025-01-04 17:29:52', 0, 'Pending');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_detail`
--

CREATE TABLE `order_detail` (
  `order_detail_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `menu_item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `total_price` decimal(10,0) GENERATED ALWAYS AS (`quantity` * `price`) STORED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_detail`
--

INSERT INTO `order_detail` (`order_detail_id`, `order_id`, `menu_item_id`, `quantity`, `price`) VALUES
(20, 30, 2, 4, 10000),
(21, 30, 4, 1, 10000);

--
-- Bẫy `order_detail`
--
DELIMITER $$
CREATE TRIGGER `after_delete_order_detail` AFTER DELETE ON `order_detail` FOR EACH ROW BEGIN
    UPDATE orders
    SET total_amount = (
        SELECT COALESCE(SUM(total_price), 0)
        FROM order_detail
        WHERE order_id = OLD.order_id
    )
    WHERE order_id = OLD.order_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_insert_order_detail` AFTER INSERT ON `order_detail` FOR EACH ROW BEGIN
    UPDATE orders
    SET total_amount = (
        SELECT SUM(total_price)
        FROM order_detail
        WHERE order_id = NEW.order_id
    )
    WHERE order_id = NEW.order_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_order_detail` AFTER UPDATE ON `order_detail` FOR EACH ROW BEGIN
    UPDATE orders
    SET total_amount = (
        SELECT SUM(total_price)
        FROM order_detail
        WHERE order_id = NEW.order_id
    )
    WHERE order_id = NEW.order_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tables`
--

CREATE TABLE `tables` (
  `table_id` int(11) NOT NULL,
  `table_name` varchar(50) NOT NULL,
  `capacity` int(11) NOT NULL,
  `status` enum('Available','Occupied','Reserved') DEFAULT 'Available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tables`
--

INSERT INTO `tables` (`table_id`, `table_name`, `capacity`, `status`) VALUES
(1, '101', 4, 'Available'),
(2, '102', 4, 'Available');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `transaction`
--

CREATE TABLE `transaction` (
  `transaction_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `table_id` int(11) NOT NULL,
  `buffer_id` int(11) NOT NULL,
  `count_people` int(11) NOT NULL DEFAULT 1,
  `payment_method` enum('Chưa','TM','CK') DEFAULT 'Chưa',
  `payment_date` datetime DEFAULT current_timestamp(),
  `amount` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `transaction`
--

INSERT INTO `transaction` (`transaction_id`, `order_id`, `account_id`, `table_id`, `buffer_id`, `count_people`, `payment_method`, `payment_date`, `amount`) VALUES
(6, 30, 1, 3, 2, 6, 'TM', NULL, 944000),
(7, 31, 1, 3, 4, 2, 'Chưa', NULL, 298000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `role` enum('Admin','User') DEFAULT 'User',
  `image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`user_id`, `email`, `password`, `user_name`, `role`, `image`) VALUES
(1, 'nam@gmail.com', '1234', 'Nong Huu Nam', 'User', NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `buffer`
--
ALTER TABLE `buffer`
  ADD PRIMARY KEY (`buffer_id`);

--
-- Chỉ mục cho bảng `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`menu_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Chỉ mục cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`order_detail_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `menu_item_id` (`menu_item_id`);

--
-- Chỉ mục cho bảng `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`table_id`);

--
-- Chỉ mục cho bảng `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `buffer`
--
ALTER TABLE `buffer`
  MODIFY `buffer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `menu`
--
ALTER TABLE `menu`
  MODIFY `menu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `order_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `tables`
--
ALTER TABLE `tables`
  MODIFY `table_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `transaction`
--
ALTER TABLE `transaction`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu` (`menu_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
