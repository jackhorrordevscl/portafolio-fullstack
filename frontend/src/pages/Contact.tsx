// ══════════════════════════════════════════════════════════════
// GROUND ZERO - Contact Page
// ══════════════════════════════════════════════════════════════

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Email,
  LocationOn,
  GitHub,
  LinkedIn,
  Instagram,
} from "@mui/icons-material";
import { 
  sendContactForm, sanitizeContactFormData } from "../services/contactService";
import { userProfile, TEXTS } from "../utils/config";
import type { ContactFormData } from "../types";
import "../styles/pages/Contact.scss";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    //Limpiar mensajes de estado al escribir
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      //Usar modo mock hasta que el backend esté listo
      const sanitizedData = sanitizeContactFormData(formData);
      const response = await sendContactForm(sanitizedData);

      if (response.success) {
        setSubmitStatus({
          type: "success",
          message: response.message,
        });
        //Limpiar Formulario
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: response.message,
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: TEXTS.contact.error,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Email />,
      label: "Email",
      vaule: userProfile.email,
      link: `mailto:${userProfile.email}`,
    },
    {
      icon: <LocationOn />,
      label: "Ubicación",
      value: userProfile.location,
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: userProfile.github,
      icon: <GitHub />,
    },
    {
      name: "LinkedIn",
      url: userProfile.linkedin,
      icon: <LinkedIn />,
    },
    {
      name: "Instagram",
      url: userProfile.instagram,
      icon: <Instagram />,
    },
  ].filter((link) => link.url);

  return (
    <div className="contact">
      <div className="contact__container container">
        {/* Header */}
        <motion.div
          className="contact__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="contact__title">{TEXTS.contact.title}</h1>
          <p className="contact__subtitle">{TEXTS.contact.subtitle}</p>
          <div
            className="accent-bar"
            style={{ width: "80px", margin: "0 auto" }}
          />
        </motion.div>

        <div className="contact__content">
          {/* Formulario */}
          <motion.div
            className="contact__form-wrapper"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              {/* Nombre */}
              <div className="contact-form__group">
                <label htmlFor="name" className="contact-form__label">
                  {TEXTS.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="contact-form__input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Email */}
              <div className="contact-form__group">
                <label htmlFor="email" className="contact-form__label">
                  {TEXTS.contact.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="contact-form__input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Asunto */}
              <div className="contact-form__group">
                <label htmlFor="subject" className="contact-form__label">
                  {TEXTS.contact.form.subject}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="contact-form__input"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Mensaje */}
              <div className="contact-form__group">
                <label htmlFor="message" className="contact-form__label">
                  {TEXTS.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="contact-form__textarea"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Status Messages */}
              {submitStatus.type && (
                <div
                  className={`contact-form__message contact-form__message--${submitStatus.type}`}
                >
                  {submitStatus.message}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="contact-form__submit btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="contact-form__spinner" />
                    {TEXTS.contact.form.sending}
                  </>
                ) : (
                  <>
                    <Send />
                    {TEXTS.contact.form.submit}
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Info de contacto */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Contact Info Cards */}
            <div className="contact__info-cards">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-info-card">
                  <div className="contact-info-card__icon">{info.icon}</div>
                  <div className="contact-info-card__content">
                    <h3 className="contact-info-card__label">{info.label}</h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="contact-info-card__value contact-info-card__value--link"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="contact-info-card__value">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="contact__social">
              <h3 className="contact__social-title">Sígueme en</h3>
              <div className="contact__social-links">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-link"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Decorative Element */}
            <div className="contact__decoration">
              <div className="contact__decoration-circle" />
              <div className="contact__decoration-dots" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
