package com.hcl.pharmacy.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

public class FileUploadUtil {

    private static final String UPLOAD_DIR = "uploads/";

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

    private static final String[] ALLOWED_IMAGE_TYPES = {
            "image/jpeg", "image/jpg", "image/png", "image/webp"
    };

    /**
     * Save a file to the uploads directory and return its stored filename.
     */
    public static String saveFile(MultipartFile file, String subDirectory) throws IOException {
        validateFile(file);

        String uploadPath = UPLOAD_DIR + subDirectory + "/";
        Path directory = Paths.get(uploadPath);

        if (!Files.exists(directory)) {
            Files.createDirectories(directory);
        }

        String originalFilename = file.getOriginalFilename();
        String extension = getExtension(originalFilename);
        String uniqueFilename = UUID.randomUUID().toString() + "." + extension;

        Path targetPath = directory.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

        return uploadPath + uniqueFilename;
    }

    /**
     * Delete a file by its stored path.
     */
    public static boolean deleteFile(String filePath) {
        try {
            Path path = Paths.get(filePath);
            return Files.deleteIfExists(path);
        } catch (IOException e) {
            return false;
        }
    }

    /**
     * Validate file size and type.
     */
    private static void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("File is empty or null");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new RuntimeException("File size exceeds 5 MB limit");
        }

        String contentType = file.getContentType();
        if (!isAllowedImageType(contentType)) {
            throw new RuntimeException("Invalid file type. Allowed: JPEG, PNG, WEBP");
        }
    }

    private static boolean isAllowedImageType(String contentType) {
        if (contentType == null) return false;
        for (String type : ALLOWED_IMAGE_TYPES) {
            if (type.equalsIgnoreCase(contentType)) return true;
        }
        return false;
    }

    private static String getExtension(String filename) {
        if (filename == null || !filename.contains(".")) return "jpg";
        return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
    }
}