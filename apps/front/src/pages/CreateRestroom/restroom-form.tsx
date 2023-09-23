import './restroom-form.css';
import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css';

export default function RestroomForm() {
    return (
        <section>
            <div className="form-box">
                <div className="form-value">
                    <form action="">
                        <h2>Restroom forms</h2>
                        <div className="inputbox">
                            <ion-icon name="home-outline"></ion-icon>
                            <input type="text" id="address" placeholder=" " required />
                            <label htmlFor="address">Address</label>
                        </div>
                        <div className="picturebox">
                            <ion-icon name="water-outline"></ion-icon>
                            <input type="file" id="picture" required />
                            <label htmlFor="picture">Upload a Picture</label>
                        </div>
                        <div className="ratingbox">
                            <div className="rating">
                                <input type="radio" name="rate" id="rate-5" />
                                <label htmlFor="rate-5" className="fas fa-star"></label>
                                <input type="radio" name="rate" id="rate-4" />
                                <label htmlFor="rate-4" className="fas fa-star"></label>
                                <input type="radio" name="rate" id="rate-3" />
                                <label htmlFor="rate-3" className="fas fa-star"></label>
                                <input type="radio" name="rate" id="rate-2" />
                                <label htmlFor="rate-2" className="fas fa-star"></label>
                                <input type="radio" name="rate" id="rate-1" />
                                <label htmlFor="rate-1" className="fas fa-star"></label>
                            </div>
                        </div>
                        <div className="inputbox">
                            <ion-icon name="pencil-outline"></ion-icon>
                            <textarea id="review" placeholder=" " required></textarea>
                            <label htmlFor="review">Review</label>
                        </div>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
