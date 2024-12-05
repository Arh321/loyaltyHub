import PagesContainer from "@/components/pages-container/pages-container";
import SurvayHeader from "@/components/survay-page-components/survay-header/survay-header";
import SurvayQuestionsSlider from "@/components/survay-page-components/survay-questions-slider/survay-questions-slider";

const SurvayPage = () => {
  return (
    <PagesContainer>
      <div className="w-full  flex flex-col">
        <SurvayHeader
          survayDescription="با شرکت در نظر سنجی، به ما کمک کنید تا خدمات و تجربه شما را بهبود بخشیم. نظرات شما برای ما ارزشمند است!"
          invoiceDate="1403/09/13"
          invoiceId="6"
          survayTopic="نظرسنجی خرید شما"
        />
        <SurvayQuestionsSlider />
      </div>
    </PagesContainer>
  );
};

export default SurvayPage;
