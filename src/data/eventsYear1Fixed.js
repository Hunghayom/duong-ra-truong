export const fixedEventsYear1 = [
    {
        id: "f1",
        title: "Ngày đầu nhập học",
        description: "Đứng trước cổng trường, bạn nhận ra mình đã chính thức trở thành sinh viên IT. Một cảm giác phấn khích xen lẫn tò mò bủa vây lấy bạn.",
        choices: [
            {
                id: "f1_c1",
                title: "Đi tìm phòng máy",
                content: "Đi dạo một vòng để làm quen với các phòng thực hành máy tính.",
                tech: 1, art: -1,
                outcome: "Bạn tìm thấy dàn máy tính đen ngòm, một chút hụt hẫng xuất hiện nhưng sự tò mò về một thế giới logic mới bắt đầu nhen nhóm."
            },
            {
                id: "f1_c2",
                title: "Thả hồn theo sở thích",
                content: "Bạn lấy cuốn sổ tay ra, ngồi xuống ghế đá và vẽ lại khung cảnh ngày nhập học để vơi đi sự nuối tiếc.",
                tech: -1, art: 2,
                outcome: "Bức vẽ tuyệt đẹp giúp bạn giải tỏa căng thẳng, nhưng bạn xém chút nữa thì quên mất giờ tập trung điểm danh."
            },
            {
                id: "f1_c3",
                title: "Tìm bạn mới",
                content: "Chủ động chào hỏi người bên cạnh xem họ có sở thích làm game không.",
                tech: 1, art: 1,
                outcome: "Trùng hợp thay, người bạn mới cũng thích thiết kế game. Cả hai lập tức tìm được tiếng nói chung."
            }
        ]
    },
    {
        id: "f2",
        title: "Môn học đầu tiên",
        description: "Thầy cô bắt đầu dạy về lập trình C++. Dù đã ôn luyện trước trong hè, thứ kiến thức này vẫn rất mới mẻ và khó hiểu đối với bạn.",
        choices: [
            {
                id: "f2_c1",
                title: "Học vẹt",
                content: "Cố gắng chép lại mọi thứ, dù không hiểu hết từng dòng lệnh.",
                tech: 2, art: -2,
                outcome: "Dù không hiểu sâu nhưng bạn vẫn nắm được cấu trúc cơ bản (chắc vậy)."
            },
            {
                id: "f2_c2",
                title: "Bị hút hồn",
                content: "Bạn lên mạng tìm trang hướng dẫn code, sau đó thấy giao diện của họ rất đẹp, bèn dành thời gian để phân tích giao diện của họ.",
                tech: -1, art: 2,
                outcome: "Mặc dù bị phân tâm khá nhiều nhưng bạn cũng phát hiện ra một số lỗi trong giao diện của họ."
            },
            {
                id: "f2_c3",
                title: "Thử cách học mới",
                content: "Tự vẽ sơ đồ tư duy ra giấy để hiểu logic code trước khi bắt tay vào gõ phím.",
                tech: 1, art: 1,
                outcome: "Dù vẫn hơi khó hiểu nhưng bạn cảm thấy phương pháp này khá thú vị và phù hợp với mình."
            }
        ]
    },
    {
        id: "f3",
        title: "Sắc màu Câu lạc bộ",
        description: "Sân trường náo nhiệt với vô số gian hàng CLB đầy màu sắc. Đứng giữa đám đông ồn ào, bạn phân vân không biết nên gửi gắm năm nhất của mình vào đâu.",
        choices: [
            {
                id: "f3_c1",
                title: "Gia nhập CLB Hỗ trợ sinh viên",
                content: "Thử sức với ban Sự kiện để tự tay lên kịch bản, thiết kế trò chơi và gắn kết mọi người.",
                tech: 0,
                art: 2,
                outcome: "Vượt qua vòng phỏng vấn đầy tiếng cười, bạn bắt tay ngay vào việc brainstorm ý tưởng cho chuyến picnic sắp tới của hội."
            },
            {
                id: "f3_c2",
                title: "Đầu quân cho Không gian Sáng tạo",
                content: "Nộp đơn vào nhóm học thuật chuyên sâu để rèn giũa kỹ năng lập trình và làm quen với dự án thực tế.",
                tech: 2,
                art: 0,
                outcome: "Trở thành thành viên chính thức, bạn bắt đầu tham gia những buổi training nội bộ cực chất và được tiếp xúc với hàng loạt thiết bị công nghệ xịn sò."
            },
            {
                id: "f3_c3",
                title: "Về phòng làm vài ván game",
                content: "Bỏ qua hết ồn ào hội nhóm, về phòng trọ mở server rủ đám bạn cũ xây dựng thế giới ảo.",
                tech: -1,
                art: -1,
                outcome: "Một \"kỳ quan\" nhà kính tuyệt đẹp ra đời trong game, nhưng đổi lại bạn lỡ mất nhịp đập năng động của giảng đường. Cảm giác lạc lõng dường như lại lớn thêm một chút."
            }
        ]
    },
    {
        id: "f4",
        title: "Bài tập lớn đầu tay",
        description: "Nhóm của bạn đang bắt tay làm một tựa game nhỏ mang tên \"Generations\". Cả đội đang tranh cãi gay gắt: nên ưu tiên xử lý logic mượt mà hay chau chuốt đồ họa trước?",
        choices: [
            {
                id: "f4_c1",
                title: "Cân trọn logic Backend",
                content: "Tự tin nhận phần xương sống của game: viết code xử lý sự kiện, tính toán xác suất và hệ thống điểm số.",
                tech: 2,
                art: -1,
                outcome: "Game vận hành trơn tru không một vết xước. Có điều, giao diện trông thô sơ và tẻ nhạt như những trang web từ những năm 2000."
            },
            {
                id: "f4_c2",
                title: "Gánh phần hình ảnh Frontend",
                content: "Đảm nhận khâu mỹ thuật, tỉ mẩn thiết kế từng icon, phối màu và căn chỉnh hiệu ứng chuyển cảnh.",
                tech: -1,
                art: 2,
                outcome: "Game đẹp lung linh như một bộ phim hoạt hình nghệ thuật. Tiếc là khi thuyết trình, các nút bấm bị đơ vì thiếu code liên kết phía sau."
            },
            {
                id: "f4_c3",
                title: "Tích hợp \"Lịch sử gia đình\"",
                content: "Đề xuất ý tưởng táo bạo: kết hợp đồ họa giao diện động với thuật toán xác suất sinh tồn để tạo ra hệ thống life-events.",
                tech: 2,
                art: 2,
                outcome: "Cả nhóm ôm lap thức trắng mấy đêm liền để \"co-op\" gõ code và vẽ vời. Đổi lại, một sản phẩm đầy chiều sâu ra đời và giành trọn điểm A+ tuyệt đối từ thầy cô!"
            }
        ]
    }
];