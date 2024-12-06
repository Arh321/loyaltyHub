import { StaticImageData } from "next/image";
import { useReducer } from "react";

export interface SurveySlide {
  id: number;
  mediuUrl: StaticImageData | string;
  question: string;
  score: number;
}

interface State {
  activeIndex: number;

  reset: boolean;
  slides: SurveySlide[];
  tempSlides: SurveySlide[];
}

type Action =
  | { type: "SET_SLIDES"; payload: SurveySlide[] }
  | { type: "SET_TEMP_SLIDES"; payload: SurveySlide[] }
  | { type: "SET_ACTIVE_INDEX"; payload: number }
  | { type: "SET_RESET"; payload: boolean }
  | { type: "NEXT_SLIDE" }
  | { type: "PREV_SLIDE" };

const initialState: State = {
  activeIndex: 0,
  reset: false,
  slides: [],
  tempSlides: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SLIDES":
      return { ...state, slides: action.payload };
    case "SET_TEMP_SLIDES":
      return { ...state, tempSlides: action.payload };
    case "SET_ACTIVE_INDEX":
      return { ...state, activeIndex: action.payload };
    case "SET_RESET":
      return { ...state, reset: action.payload };

    default:
      return state;
  }
};

const useScore = (initialSlides: SurveySlide[]) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    slides: initialSlides,
    tempSlides: initialSlides,
  });

  const setSlides = (slides: SurveySlide[]) =>
    dispatch({ type: "SET_SLIDES", payload: slides });

  const setTempSlides = (slides: SurveySlide[]) =>
    dispatch({ type: "SET_TEMP_SLIDES", payload: slides });

  const setActiveIndex = (index: number) =>
    dispatch({ type: "SET_ACTIVE_INDEX", payload: index });

  const setReset = (reset: boolean) =>
    dispatch({ type: "SET_RESET", payload: reset });

  return {
    state,
    setSlides,
    setTempSlides,
    setActiveIndex,
    setReset,
  };
};

export default useScore;
