//package com.muneo.dealwith.Controller;
//
//import com.muneo.dealwith.Dto.CustomUser;
//import com.muneo.dealwith.Dto.JoinAuctionRequest;
//import com.muneo.dealwith.Entity.AuctionRoom;
//import com.muneo.dealwith.Entity.AuctionRoomPart;
//import com.muneo.dealwith.Entity.Member;
//import com.muneo.dealwith.Repository.AuctionRoomPartRepository;
//import com.muneo.dealwith.Repository.AuctionRoomRepository;
//import com.muneo.dealwith.Service.AuctionRoomService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequiredArgsConstructor
//public class AuctionRoomController {
//
//    private final AuctionRoomService auctionRoomService;
//    private final AuctionRoomRepository auctionRoomRepository;
//    private final AuctionRoomPartRepository auctionRoomPartRepository;
//
//    @PostMapping("/create/auction")
//    public AuctionRoom createAuction(@RequestBody Map<String,Object> request) {
//        Long productId = Long.valueOf(request.get("productId").toString());
//        return auctionRoomService.createAuctionRoom(productId);
//    }
//
//    @PostMapping("/auctionRoom/{roomId}/join")
//    public void joinAuctionRoom(@PathVariable Long roomId,
//                                @RequestBody JoinAuctionRequest request,
//                                Authentication auth) {
//        var user = (CustomUser) auth.getPrincipal();
//        Long userIdx = Long.parseLong(user.getUserIdx());
//
//        auctionRoomService.joinAuctionRoom(userIdx, roomId);
//    }
////
////    @GetMapping("/auction/list")
////    public List<AuctionRoomDto> getAllAuctionRooms(Authentication auth) {
////        CustomUser user = (CustomUser) auth.getPrincipal();
////        Long memberId = Long.parseLong(user.getUserIdx());
////        return auctionRoomService.getUserAuctionRooms(memberId);
////    }
//}
