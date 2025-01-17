import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSwiperSlide } from "swiper/react";
import { Meal, MealCartItem } from "@/types/global";
import { useAppDispatch, useAppSelector } from "../_lib/store/hooks";
import { addMeal, deleteMeal } from "../_lib/store/features/cart/cartSlice";
import { HiCheck } from "react-icons/hi2";

function MealCardSlider({ meal }: { meal: Meal }) {
    const dispatch = useAppDispatch();
    const meals = useAppSelector((state) => state.cart.meals);
    const slide = useSwiperSlide();
    return (
        <div
            className={`flex flex-col justify-between items-center transition-all ${
                (slide.isNext || slide.isPrev) && "translate-y-10"
            } ${
                !slide.isNext &&
                !slide.isPrev &&
                !slide.isActive &&
                "translate-y-20"
            }`}
        >
            <Link href={`/dashboard/menu/${meal.id}`}>
                <Image
                    className={`${!slide.isActive && "grayscale"}`}
                    src={meal.image}
                    width={100}
                    height={100}
                    alt={meal.name}
                />
            </Link>
            {slide.isActive && (
                <div className="flex flex-col gap-3 justify-between items-center">
                    <h2>{meal.name}</h2>
                    <p className="h-10 text-sm text-zinc-500 overflow-hidden">
                        {meal.vegtables.map((vegtable) => `${vegtable.name}, `)}
                    </p>
                    <div className="flex self-stretch items-center justify-between">
                        <p className="font-bold">🔥 {meal.calories} Kcal</p>
                        <p className="font-bold">${meal.price}</p>
                        {meals.filter((currMeal) => currMeal.id == meal.id)
                            .length == 0 ? (
                            <div
                                onClick={() => dispatch(addMeal(meal))}
                                className="font-black bg-myGreen rounded-full px-4 py-2 cursor-pointer"
                            >
                                +
                            </div>
                        ) : (
                            <div
                                onClick={() => dispatch(deleteMeal(meal.id))}
                                className="font-black bg-myGreen rounded-full px-4 py-2 cursor-pointer"
                            >
                                <HiCheck strokeWidth={3} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MealCardSlider;
