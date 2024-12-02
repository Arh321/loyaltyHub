import PagesContainer from "@/components/pages-container/pages-container";
import SurvayHeader from "@/components/survay-page-components/survay-header/survay-header";

const SurvayPage = () => {
  return (
    <PagesContainer>
      <div className="w-full sm:px-6">
        <SurvayHeader
          survayDescription="با شرکت در نظر سنجی، به ما کمک کنید تا خدمات و تجربه شما را بهبود بخشیم. نظرات شما برای ما ارزشمند است!"
          invoiceDate="1403/09/13"
          invoiceId="6"
          survayTopic="نظرسنجی خرید شما"
        />
      </div>
    </PagesContainer>
  );
};

export default SurvayPage;
