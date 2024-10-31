package com.pnu.pickle.group.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "group_payments")
public class GroupPayment {
    @Id
    @GeneratedValue
    @Column(name = "group_payment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private Group group;

    @Column(name = "card_brand")
    private String cardBrand;

    @Column(name = "card_number")
    private String cardNumber;

    @Column(name = "card_owner")
    private String cardOwner;
}
