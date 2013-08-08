package com.nayidisha.pointy;

import org.junit.Assert;
import org.junit.Test; 
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;

public class E2ETests {
	
	private static String LOCAL_END_POINT = "http://localhost:9020/pointy"; 

    @SuppressWarnings("unchecked")
	@Test
    public void runE2ETests() {
        WebDriver driver = new FirefoxDriver();

        driver.get(LOCAL_END_POINT + "/test/e2e/runner.html");
        @SuppressWarnings("rawtypes")
		ExpectedCondition e = new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return !d.findElement(By.id("application")).isDisplayed();
            }
        };
        @SuppressWarnings("rawtypes")
        //wait 20 seconds for tests to pass...
		Wait w = new WebDriverWait(driver, 20);
        w.until(e);

        WebElement error   = driver.findElement(By.className("status-error"));
        WebElement failure = driver.findElement(By.className("status-failure"));
        WebElement success = driver.findElement(By.className("status-success"));

        //Rather than extract the maven log writer, sysout works just as well ;)
        System.out.println("\n\n\n------------------------------------------------------------------------");
        System.out.println("AngularJS End-to-End-Tests\n");

        System.out.println(error.getText());
        System.out.println(failure.getText());
        System.out.println(success.getText());

        System.out.println("------------------------------------------------------------------------\n\n\n");

        Assert.assertEquals(error.getText(), "0 Errors");
        Assert.assertEquals(failure.getText(), "0 Failures");

        driver.close();
    }
}
