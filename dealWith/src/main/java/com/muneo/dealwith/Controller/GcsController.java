package com.muneo.dealwith.Controller;

import com.muneo.dealwith.Dto.GcsRequest;
import com.muneo.dealwith.Service.GcsService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class GcsController {

    private final GcsService gcsService;

    @PostMapping("/gcs/upload")
    public ResponseEntity<Void> objectUpload(GcsRequest gcsRequest) throws IOException {
        gcsService.uploadObject(gcsRequest);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
