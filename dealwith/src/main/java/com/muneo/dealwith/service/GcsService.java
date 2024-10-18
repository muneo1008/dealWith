package com.muneo.dealwith.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import com.muneo.dealwith.dto.GcsRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.IOException;
import java.io.InputStream;

@Service
public class GcsService {

    @Value("${spring.cloud.gcp.storage.bucket}")
    private String bucketName;

    public String uploadObject(GcsRequest gcsRequest) throws IOException {

        String keyFileName = "dealwith-439012-7580437229c0.json";
        InputStream keyFile = ResourceUtils.getURL("classpath:" + keyFileName).openStream();

        Storage storage = StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(keyFile))
                .build()
                .getService();

        BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, (gcsRequest.getName()+"_"+gcsRequest.getFile().getOriginalFilename()))
                .setContentType(gcsRequest.getFile().getContentType()).build();

        Blob blob = storage.create(blobInfo, gcsRequest.getFile().getInputStream());

        String imgUrl = String.format("https://storage.googleapis.com/%s/%s", bucketName, blob.getName());
        return imgUrl;
    }

}
