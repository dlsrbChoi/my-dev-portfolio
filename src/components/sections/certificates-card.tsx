'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { CertificateEntry } from '@/lib/education-data'
import { Badge } from '@/components/ui/badge'
import { Trophy } from 'lucide-react'

export function CertificatesCard({ certificates }: { certificates: CertificateEntry[] }) {
  const t = useTranslations('education')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-3">
          <Trophy className="h-5 w-5 text-primary" />
          <h2 className="text-xl md:text-2xl font-bold">{t('certificatesTitle')}</h2>
        </div>
      </motion.div>

      <div className="space-y-0">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="relative pl-6 pb-6 border-l-2 border-border/30 last:pb-0"
          >
            {/* 타임라인 점 */}
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-background" />

            {/* 내용 */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h3 className="font-medium">{cert.name}</h3>
                <p className="text-sm text-muted-foreground">{cert.organization}</p>
              </div>
              <Badge variant="secondary" className="shrink-0 w-fit">
                {cert.date}
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
