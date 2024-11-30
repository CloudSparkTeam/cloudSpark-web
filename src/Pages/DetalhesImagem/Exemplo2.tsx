import {register} from 'swiper/element/bundle'
import {Swiper, SwiperSlide} from 'swiper/react'
import { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import axios from 'axios'


register()



export default function DetalhesImagem3() {

    type ImageUrl = {
        url: string;
        name: string;
    };
    
      const [images, setImages] = useState<ImageUrl[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      const fetchImagensTratadas = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3002/imagemSatelite/imagens-tratadas/2');
            setImages(response.data);
        } catch {
            setError('Erro ao buscar imagens tratadas!');
        } finally {
            setLoading(false);
        }
    };

      useEffect(() => {
        fetchImagensTratadas(); // Busca as imagens quando o componente é montado
        console.log("esse é o erro", typeof(images))
        console.log(images)
    }, []);

    return(
        <div>
            <Swiper
                slidesPerView={1}
                pagination={{clickable: true}}
                navigation
            >
                {images.map( (item) => (
                    <SwiperSlide key={item.url}>
                        <img 
                        key={item.url}
                            src={item.url}
                            alt='slider'
                            className='slide-item'
                        />
                    
                    </SwiperSlide>
                ) )}
            </Swiper>
        </div>
    )
}