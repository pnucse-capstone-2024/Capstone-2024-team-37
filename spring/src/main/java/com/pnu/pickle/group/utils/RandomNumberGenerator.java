package com.pnu.pickle.group.utils;

import java.util.Random;

public class RandomNumberGenerator {
    public static String randomNumber(int range) {
        StringBuilder sb = new StringBuilder();
        Random rd = new Random();

        for(int i=0;i<range;i++){
            sb.append(rd.nextInt(10));
        }

        return sb.toString();
    }
}
