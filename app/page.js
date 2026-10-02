"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight, Bot, Check, ChevronDown, CircleHelp, CreditCard,
  Headphones, Menu, MessageCircle, Package, Plus, ShieldCheck,
  ShoppingCart, Sparkles, Star, X, Zap
} from "lucide-react";

const products = [
  { id:"credits20", name:"Créditos 20 + 40", price:8, period:"USD", description:"Paquete de créditos", features:["20 + 40 créditos","Acceso al bot","Entrega según configuración","Soporte"], popular:false },
  { id:"credits50", name:"Créditos 50 + 100", price:15, period:"USD", description:"Paquete de créditos", features:["50 + 100 créditos","Acceso al bot","Entrega según configuración","Soporte"], popular:true },
  { id:"credits100", name:"Créditos 100 + 250", price:25, period:"USD", description:"Paquete de créditos", features:["100 + 250 créditos","Acceso al bot","Entrega según configuración","Soporte"], popular:false },
  { id:"credits200", name:"Créditos 200 + 300", price:40, period:"USD", description:"Paquete de créditos", features:["200 + 300 créditos","Acceso al bot","Entrega según configuración","Soporte"], popular:false },
  { id:"plan3", name:"Plan 3 días", price:10, period:"USD", description:"Acceso por tiempo", features:["3 días de duración","Acceso al bot","Soporte","Activación"], popular:false },
  { id:"plan7", name:"Plan 7 días", price:20, period:"USD", description:"Acceso por tiempo", features:["7 días de duración","Acceso al bot","Soporte","Activación"], popular:false },
  { id:"plan15", name:"Plan 15 días", price:32, period:"USD", description:"Acceso por tiempo", features:["15 días de duración","Acceso al bot","Soporte","Activación"], popular:true },
  { id:"plan30", name:"Plan 30 días", price:50, period:"USD", description:"Acceso por tiempo", features:["30 días de duración","Acceso al bot","Soporte","Activación"], popular:false }
];

const faqs = [
  ["¿Cómo recibo el acceso?","Después de confirmar el pago, podrás recibir las instrucciones de acceso por el canal de soporte configurado."],
  ["¿Puedo cambiar de plan?","Sí. El flujo de compra está preparado para que puedas elegir otro plan cuando lo necesites."],
  ["¿Qué métodos de pago puedo usar?","La web permite mostrar tus métodos disponibles y puedes conectar un proveedor de pago real desde el backend."],
  ["¿Hay soporte?","Sí. Usa el botón de soporte o contacto para comunicarte con tu equipo."],
];

export default function Home() {
  const [cart,setCart] = useState([]);
  const [cartOpen,setCartOpen] = useState(false);
  const [mobile,setMobile] = useState(false);
  const [faq,setFaq] = useState(null);
  const [toast,setToast] = useState("");
  const [checkout,setCheckout] = useState(false);

  const total = useMemo(()=>cart.reduce((s,p)=>s+p.price,0),[cart]);

  function add(p){
    setCart(c=>c.some(x=>x.id===p.id)?c:c.concat(p));
    setToast(`${p.name} agregado al carrito`);
    setTimeout(()=>setToast(""),2200);
  }
  function remove(id){ setCart(c=>c.filter(x=>x.id!==id)); }

  return (
    <main>
      {toast && <div className="toast"><Check size={18}/>{toast}</div>}

      <header className="nav">
        <a className="brand" href="#inicio"><span className="brandIcon"><img src="/logo-legado.jpg" alt="Legado-Bot"/></span>Legado<span>-Bot</span></a>
        <nav className={mobile?"navLinks open":"navLinks"}>
          <a href="#inicio" onClick={()=>setMobile(false)}>Inicio</a>
          <a href="#servicios" onClick={()=>setMobile(false)}>Servicios</a>
          <a href="#precios" onClick={()=>setMobile(false)}>Precios</a>
          <a href="#medios" onClick={()=>setMobile(false)}>Pagos</a>
          <a href="#contacto" onClick={()=>setMobile(false)}>Contacto</a>
          <a href="#soporte" onClick={()=>setMobile(false)}>Soporte</a>
        </nav>
        <div className="navActions">
          <button className="iconBtn" aria-label="Carrito" onClick={()=>setCartOpen(true)}><ShoppingCart size={20}/>{cart.length>0&&<b>{cart.length}</b>}</button>
          <button className="menuBtn" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button>
          <a className="smallCta" href="#precios">Comprar <ArrowRight size={16}/></a>
        </div>
      </header>

      <section id="inicio" className="hero section">
        <div className="heroGlow"/>
        <div className="heroCopy">
          <div className="eyebrow"><Sparkles size={15}/> Plataforma profesional para tu bot</div>
          <h1>Tu acceso.<br/><span>Sin límites.</span><br/>Más rápido.</h1>
          <p>Compra créditos y planes de Legado-Bot desde una experiencia rápida, clara y diseñada para cualquier dispositivo.</p>
          <div className="heroBtns">
            <a className="primary" href="#precios">Ver precios <ArrowRight size={18}/></a>
            <a className="secondary" href="#servicios"><PlayIcon/> Conocer más</a>
          </div>
          <div className="trust"><div className="avatars"><i>A</i><i>B</i><i>C</i></div><span><strong>Clientes y usuarios</strong><br/>Una experiencia pensada para crecer</span></div>
        </div>
        <div className="heroCard">
          <img className="heroImage" src="/banner-legado.jpg" alt="Legado-Bot" />
          <div className="heroOverlay"><span><ShieldCheck size={15}/> Rápido</span><span><Zap size={15}/> Seguridad</span><span><Headphones size={15}/> Soporte</span></div>
        </div>
      </section>

      <section className="stats section">
        <Stat icon={<Zap/>} title="Rápido" text="Experiencia optimizada"/>
        <Stat icon={<ShieldCheck/>} title="Seguro" text="Arquitectura preparada"/>
        <Stat icon={<Headphones/>} title="Soporte" text="Ayuda cuando la necesites"/>
        <Stat icon={<Sparkles/>} title="Actualizado" text="Mejoras continuas"/>
      </section>

      <section id="servicios" className="section block">
        <div className="sectionHead"><div><div className="eyebrow">SERVICIOS</div><h2>Todo lo que necesitas<br/><span>en un solo lugar.</span></h2></div><p>Presenta las capacidades de tu bot de forma clara y profesional.</p></div>
        <div className="featureGrid">
          <Feature icon={<Bot/>} title="Acceso al bot" text="Gestiona el acceso de tus clientes desde una experiencia sencilla."/>
          <Feature icon={<Zap/>} title="Automatización" text="Ahorra tiempo con flujos preparados para tus operaciones."/>
          <Feature icon={<ShieldCheck/>} title="Gestión segura" text="Diseña tu servicio pensando en privacidad y control."/>
          <Feature icon={<MessageCircle/>} title="Atención" text="Mantén un canal claro para dudas, soporte y seguimiento."/>
          <Feature icon={<Package/>} title="Planes flexibles" text="Ofrece diferentes niveles de acceso según cada cliente."/>
          <Feature icon={<CreditCard/>} title="Checkout" text="Carrito y proceso de compra preparados para integrar pagos reales."/>
        </div>
      </section>

      <section id="precios" className="section pricing">
        <div className="centerHead"><div className="eyebrow">PRECIOS</div><h2>Elige créditos o un plan</h2><p>Créditos y planes oficiales mostrados según tu catálogo.</p></div>
        <div className="priceGrid">
          {products.map(p=><article className={"priceCard "+(p.popular?"featured":"")} key={p.id}>
            {p.popular&&<div className="popular">MÁS ELEGIDO</div>}
            <div className="priceTop"><h3>{p.name}</h3>{p.popular&&<Star size={19}/>}</div>
            <p>{p.description}</p>
            <div className="price"><small>$</small>{p.price.toFixed(2)}<em>/{p.period}</em></div>
            <button className="primary full" onClick={()=>add(p)}><ShoppingCart size={17}/> Agregar al carrito</button>
            <ul>{p.features.map(f=><li key={f}><Check size={17}/>{f}</li>)}</ul>
          </article>)}
        </div>
      </section>

      <section id="medios" className="section paymentSection">
        <div className="paymentBox">
          <div><div className="eyebrow">MEDIOS DE PAGO</div><h2>Compra de forma sencilla.</h2><p>Configura aquí los métodos que realmente tengas habilitados. No mostramos pagos simulados.</p></div>
          <div className="paymentMethods">
            <Payment name="Binance Pay" icon={<CreditCard/>}/>
            <Payment name="Nequi" icon={<Package/>}/>
            <Payment name="Bre-B" icon={<ArrowRight/>}/>
          </div>
        </div>
      </section>

      <section id="soporte" className="section block">
        <div className="support">
          <div className="supportIcon"><Headphones size={30}/></div>
          <div><div className="eyebrow">SOPORTE</div><h2>¿Necesitas ayuda?</h2><p>Contacta con tu equipo de soporte para resolver dudas sobre acceso, planes o compras.</p></div>
          <a className="secondary" href="#contacto">Contactar soporte <ArrowRight size={17}/></a>
        </div>
      </section>

      <section className="section faqSection">
        <div className="centerHead"><div className="eyebrow">FAQ</div><h2>Preguntas frecuentes</h2></div>
        <div className="faq">{faqs.map(([q,a],i)=><div className="faqItem" key={q}><button onClick={()=>setFaq(faq===i?null:i)}><span>{q}</span>{faq===i?<X size={19}/>:<ChevronDown size={19}/>}</button>{faq===i&&<p>{a}</p>}</div>)}</div>
      </section>

      <section id="contacto" className="section contact">
        <div><div className="eyebrow">CONTACTO</div><h2>Hablemos.</h2><p>Cuéntanos qué necesitas y configura tus canales de atención.</p></div>
        <form onSubmit={e=>{e.preventDefault();setToast("Mensaje preparado. Conecta este formulario a tu backend.");setTimeout(()=>setToast(""),2500)}} className="contactForm">
          <input required placeholder="Nombre"/>
          <input required type="email" placeholder="Correo electrónico"/>
          <textarea required placeholder="¿En qué podemos ayudarte?"/>
          <button className="primary" type="submit">Enviar mensaje <ArrowRight size={17}/></button>
        </form>
      </section>

      <footer className="footer">
        <div className="footerBrand"><a className="brand" href="#inicio"><span className="brandIcon"><img src="/logo-legado.jpg" alt="Legado-Bot"/></span>Legado<span>-Bot</span></a><p>Créditos y planes para acceder a Legado-Bot desde una experiencia rápida y profesional.</p></div>
        <div className="footerCols"><div><b>Producto</b><a href="#servicios">Servicios</a><a href="#precios">Precios</a><a href="#medios">Pagos</a></div><div><b>Ayuda</b><a href="#soporte">Soporte</a><a href="#contacto">Contacto</a><a href="#inicio">Inicio</a></div><div><b>Legal</b><a href="#">Términos</a><a href="#">Privacidad</a></div></div>
        <div className="copyright">© 2026 Legado-Bot. Todos los derechos reservados.</div>
      </footer>

      {cartOpen&&<div className="overlay" onClick={()=>setCartOpen(false)}><aside className="cart" onClick={e=>e.stopPropagation()}>
        <div className="cartHead"><h2>Tu carrito</h2><button className="iconBtn" onClick={()=>setCartOpen(false)}><X/></button></div>
        {cart.length===0?<div className="empty"><ShoppingCart size={40}/><h3>Tu carrito está vacío</h3><p>Agrega un plan para continuar.</p></div>:<><div className="cartItems">{cart.map(p=><div className="cartItem" key={p.id}><div><b>{p.name}</b><span>${p.price.toFixed(2)}/mes</span></div><button onClick={()=>remove(p.id)}><X size={17}/></button></div>)}</div><div className="cartTotal"><span>Total</span><strong>${total.toFixed(2)}</strong></div><button className="primary full" onClick={()=>setCheckout(true)}>Continuar al pago <ArrowRight size={17}/></button></>}
      </aside></div>}

      {checkout&&<div className="overlay"><div className="checkout"><button className="closeCheckout iconBtn" onClick={()=>setCheckout(false)}><X/></button><div className="eyebrow">CHECKOUT</div><h2>Finalizar compra</h2><p>Esta plantilla está preparada para conectar un proveedor de pagos real.</p><div className="checkoutTotal">Total <strong>${total.toFixed(2)}</strong></div><button className="primary full" onClick={()=>{setCheckout(false);setCartOpen(false);setToast("Conecta aquí tu proveedor de pago para procesar la compra.");setTimeout(()=>setToast(""),3000)}}>Continuar con el pago <CreditCard size={17}/></button><small>Por seguridad, no se procesan datos de tarjeta directamente en esta plantilla.</small></div></div>}
    </main>
  );
}

function PlayIcon(){return <span className="play">▶</span>}
function Stat({icon,title,text}){return <div className="stat"><span>{icon}</span><div><b>{title}</b><small>{text}</small></div></div>}
function Feature({icon,title,text}){return <article className="feature"><span className="featureIcon">{icon}</span><h3>{title}</h3><p>{text}</p><a href="#precios">Ver planes <ArrowRight size={15}/></a></article>}
function Payment({name,icon}){return <div className="pay"><span>{icon}</span><b>{name}</b><small>Configurable</small></div>}
