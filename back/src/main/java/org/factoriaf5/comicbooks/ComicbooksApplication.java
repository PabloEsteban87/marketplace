package org.factoriaf5.comicbooks;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.annotation.Resource;
import org.factoriaf5.comicbooks.files.FilesStorageService;
@SpringBootApplication
public class ComicbooksApplication implements CommandLineRunner{
@Resource
	FilesStorageService storageService;
	public static void main(String[] args) {
		SpringApplication.run(ComicbooksApplication.class, args);
	}
	@Override
  public void run(String... arg) throws Exception {
//    storageService.deleteAll();
    storageService.init();
  }

}
